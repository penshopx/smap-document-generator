import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get query parameters
    const url = new URL(request.url)
    const courseId = url.searchParams.get("courseId")
    const moduleId = url.searchParams.get("moduleId")

    // Build query
    let query = supabase.from("assessments").select("*")

    if (courseId) {
      query = query.eq("course_id", courseId)
    }

    if (moduleId) {
      query = query.eq("module_id", moduleId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    const { course_id, title, description, passing_score, attempts_allowed } = body
    if (!course_id || !title || !description || passing_score === undefined || !attempts_allowed) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create assessment
    const { data, error } = await supabase
      .from("assessments")
      .insert({
        course_id,
        module_id: body.module_id || null,
        title,
        description,
        time_limit: body.time_limit || null,
        passing_score,
        attempts_allowed,
        is_published: body.is_published || false,
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
