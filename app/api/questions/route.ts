import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

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
    const { assessment_id, question_text, question_type, correct_answer, points, order } = body
    if (
      !assessment_id ||
      !question_text ||
      !question_type ||
      !correct_answer ||
      points === undefined ||
      order === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create question
    const { data, error } = await supabase
      .from("questions")
      .insert({
        assessment_id,
        question_text,
        question_type,
        options: body.options || null,
        correct_answer,
        points,
        order,
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
