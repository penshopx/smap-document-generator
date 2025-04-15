import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(request.url)
    const assessmentId = url.searchParams.get("assessmentId")
    const userId = url.searchParams.get("userId") || session.user.id

    // Build query
    let query = supabase.from("user_assessments").select("*")

    if (assessmentId) {
      query = query.eq("assessment_id", assessmentId)
    }

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query.order("completed_at", { ascending: false })

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
    const { assessment_id, score, passed, time_spent, answers } = body
    if (!assessment_id || score === undefined || passed === undefined || !time_spent || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create user assessment
    const { data, error } = await supabase
      .from("user_assessments")
      .insert({
        user_id: session.user.id,
        assessment_id,
        score,
        passed,
        time_spent,
        started_at: body.started_at || new Date().toISOString(),
        completed_at: new Date().toISOString(),
        answers,
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
