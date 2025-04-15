import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    // Ambil parameter query
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const level = url.searchParams.get("level")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const offset = (page - 1) * limit

    // Buat query dasar
    let query = supabase.from("courses").select("*, users!instructor_id(full_name, avatar_url)", { count: "exact" })

    // Tambahkan filter jika ada
    if (category) {
      query = query.eq("category", category)
    }

    if (level) {
      query = query.eq("level", level)
    }

    // Tambahkan pagination
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    // Verifikasi autentikasi
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validasi input
    const { title, description, level, duration, category, image_url } = body
    if (!title || !description || !level || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simpan kursus baru
    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        level,
        duration,
        category,
        image_url,
        instructor_id: session.user.id,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
