import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

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

    // Update question
    const { data, error } = await supabase
      .from("questions")
      .update({
        question_text: body.question_text,
        question_type: body.question_type,
        options: body.options,
        correct_answer: body.correct_answer,
        points: body.points,
        order: body.order,
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

    // Delete question
    const { error } = await supabase.from("questions").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
