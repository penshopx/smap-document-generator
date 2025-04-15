import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = params.id

    // Get assessment with questions
    const { data: assessment, error: assessmentError } = await supabase
      .from("assessments")
      .select("*")
      .eq("id", id)
      .single()

    if (assessmentError) {
      return NextResponse.json({ error: assessmentError.message }, { status: 500 })
    }

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Get questions for this assessment
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("assessment_id", id)
      .order("order", { ascending: true })

    if (questionsError) {
      return NextResponse.json({ error: questionsError.message }, { status: 500 })
    }

    return NextResponse.json({
      data: {
        ...assessment,
        questions: questions || [],
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

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Update assessment
    const { data, error } = await supabase
      .from("assessments")
      .update({
        title: body.title,
        description: body.description,
        time_limit: body.time_limit,
        passing_score: body.passing_score,
        attempts_allowed: body.attempts_allowed,
        is_published: body.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

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

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete questions first (foreign key constraint)
    await supabase.from("questions").delete().eq("assessment_id", id)

    // Delete assessment
    const { error } = await supabase.from("assessments").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
