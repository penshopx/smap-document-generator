import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = params.id

    // Ambil detail kursus
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*, users!instructor_id(id, full_name, avatar_url, bio)")
      .eq("id", id)
      .single()

    if (courseError) {
      return NextResponse.json({ error: courseError.message }, { status: 500 })
    }

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Ambil modul kursus
    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select("*")
      .eq("course_id", id)
      .order("sort_order", { ascending: true })

    if (modulesError) {
      return NextResponse.json({ error: modulesError.message }, { status: 500 })
    }

    // Ambil status enrollment untuk user saat ini (jika login)
    const {
      data: { session },
    } = await supabase.auth.getSession()
    let enrollment = null

    if (session) {
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("course_id", id)
        .single()

      enrollment = enrollmentData
    }

    return NextResponse.json({
      data: {
        ...course,
        modules,
        enrollment,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = params.id

    // Verifikasi autentikasi
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verifikasi kepemilikan kursus
    const { data: course } = await supabase.from("courses").select("instructor_id").eq("id", id).single()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (course.instructor_id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    // Update kursus
    const { data, error } = await supabase.from("courses").update(body).eq("id", id).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = params.id

    // Verifikasi autentikasi
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verifikasi kepemilikan kursus
    const { data: course } = await supabase.from("courses").select("instructor_id").eq("id", id).single()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (course.instructor_id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Hapus kursus
    const { error } = await supabase.from("courses").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
