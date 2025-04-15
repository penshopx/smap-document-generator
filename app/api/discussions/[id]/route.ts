import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const id = params.id

    // Increment view count
    await supabase.rpc("increment_discussion_views", { discussion_id: id })

    // Get discussion details
    const { data: discussion, error: discussionError } = await supabase
      .from("discussions")
      .select("*, users!user_id(id, full_name, avatar_url)")
      .eq("id", id)
      .single()

    if (discussionError) {
      return NextResponse.json({ error: discussionError.message }, { status: 500 })
    }

    if (!discussion) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 })
    }

    // Get replies
    const { data: replies, error: repliesError } = await supabase
      .from("replies")
      .select("*, users!user_id(id, full_name, avatar_url)")
      .eq("discussion_id", id)
      .order("created_at", { ascending: true })

    if (repliesError) {
      return NextResponse.json({ error: repliesError.message }, { status: 500 })
    }

    return NextResponse.json({
      data: {
        ...discussion,
        replies: replies || [],
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
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

    // Validate input
    const { content } = body
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Check if discussion exists
    const { data: discussion } = await supabase.from("discussions").select("id").eq("id", id).single()

    if (!discussion) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 })
    }

    // Create new reply
    const { data, error } = await supabase
      .from("replies")
      .insert({
        discussion_id: id,
        user_id: session.user.id,
        content,
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
