"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getDiscussions(
  options: {
    category?: string
    limit?: number
    page?: number
  } = {},
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { category, limit = 10, page = 1 } = options
    const offset = (page - 1) * limit

    // Build query
    let query = supabase.from("discussions").select("*, users(*)", { count: "exact" })

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }

    // Execute query with pagination
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw new Error(error.message)
    }

    return {
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    }
  } catch (error: any) {
    console.error("Error fetching discussions:", error)
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      error: error.message,
    }
  }
}

export async function getDiscussionById(id: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get discussion
    const { data: discussion, error: discussionError } = await supabase
      .from("discussions")
      .select("*, users(*)")
      .eq("id", id)
      .single()

    if (discussionError) {
      throw new Error(discussionError.message)
    }

    // Get replies
    const { data: replies, error: repliesError } = await supabase
      .from("replies")
      .select("*, users(*)")
      .eq("discussion_id", id)
      .order("created_at", { ascending: true })

    if (repliesError) {
      throw new Error(repliesError.message)
    }

    return {
      data: {
        ...discussion,
        replies,
      },
    }
  } catch (error: any) {
    console.error("Error fetching discussion:", error)
    return { error: error.message }
  }
}

export async function createDiscussion(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to create a discussion")
    }

    // Extract form data
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string

    // Validate required fields
    if (!title || !content) {
      throw new Error("Title and content are required")
    }

    // Create discussion
    const { data, error } = await supabase
      .from("discussions")
      .insert({
        user_id: session.user.id,
        title,
        content,
        category,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/forum")
    return { data }
  } catch (error: any) {
    console.error("Error creating discussion:", error)
    return { error: error.message }
  }
}

export async function createReply(discussionId: string, formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to reply")
    }

    // Extract form data
    const content = formData.get("content") as string

    // Validate required fields
    if (!content) {
      throw new Error("Content is required")
    }

    // Create reply
    const { data, error } = await supabase
      .from("replies")
      .insert({
        user_id: session.user.id,
        discussion_id: discussionId,
        content,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath(`/forum/${discussionId}`)
    return { data }
  } catch (error: any) {
    console.error("Error creating reply:", error)
    return { error: error.message }
  }
}
