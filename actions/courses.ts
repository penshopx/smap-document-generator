"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getCourses(
  options: {
    category?: string
    level?: string
    limit?: number
    page?: number
  } = {},
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { category, level, limit = 10, page = 1 } = options
    const offset = (page - 1) * limit

    // Build query
    let query = supabase.from("courses").select("*, users!instructor_id(*)", { count: "exact" })

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }

    if (level) {
      query = query.eq("level", level)
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
    console.error("Error fetching courses:", error)
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

export async function getCourseById(id: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*, users!instructor_id(*)")
      .eq("id", id)
      .single()

    if (courseError) {
      throw new Error(courseError.message)
    }

    // Get course modules
    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select("*")
      .eq("course_id", id)
      .order("sort_order", { ascending: true })

    if (modulesError) {
      throw new Error(modulesError.message)
    }

    // Get course resources
    const { data: resources, error: resourcesError } = await supabase
      .from("resources")
      .select("*")
      .eq("course_id", id)
      .order("created_at", { ascending: true })

    if (resourcesError) {
      throw new Error(resourcesError.message)
    }

    // Get enrollment status for current user
    const {
      data: { session },
    } = await supabase.auth.getSession()
    let enrollment = null

    if (session?.user) {
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("course_id", id)
        .single()

      enrollment = enrollmentData
    }

    return {
      data: {
        ...course,
        modules,
        resources,
        enrollment,
      },
    }
  } catch (error: any) {
    console.error("Error fetching course:", error)
    return {
      error: error.message,
    }
  }
}

export async function createCourse(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to create a course")
    }

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const level = formData.get("level") as string
    const category = formData.get("category") as string
    const duration = Number.parseInt(formData.get("duration") as string) || 0
    const image_url = formData.get("image_url") as string

    // Validate required fields
    if (!title || !description || !level || !category) {
      throw new Error("Missing required fields")
    }

    // Insert course
    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        level,
        category,
        duration,
        image_url: image_url || "/placeholder.svg?height=300&width=800",
        instructor_id: session.user.id,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/courses")
    return { data }
  } catch (error: any) {
    console.error("Error creating course:", error)
    return { error: error.message }
  }
}

export async function updateCourse(id: string, formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to update a course")
    }

    // Check if user is the instructor
    const { data: course } = await supabase.from("courses").select("instructor_id").eq("id", id).single()

    if (!course || course.instructor_id !== session.user.id) {
      throw new Error("You don't have permission to update this course")
    }

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const level = formData.get("level") as string
    const category = formData.get("category") as string
    const duration = Number.parseInt(formData.get("duration") as string) || 0
    const image_url = formData.get("image_url") as string

    // Validate required fields
    if (!title || !description || !level || !category) {
      throw new Error("Missing required fields")
    }

    // Update course
    const { data, error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        level,
        category,
        duration,
        image_url: image_url || "/placeholder.svg?height=300&width=800",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath(`/courses/${id}`)
    revalidatePath("/courses")
    return { data }
  } catch (error: any) {
    console.error("Error updating course:", error)
    return { error: error.message }
  }
}

export async function deleteCourse(id: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to delete a course")
    }

    // Check if user is the instructor
    const { data: course } = await supabase.from("courses").select("instructor_id").eq("id", id).single()

    if (!course || course.instructor_id !== session.user.id) {
      throw new Error("You don't have permission to delete this course")
    }

    // Delete course
    const { error } = await supabase.from("courses").delete().eq("id", id)

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/courses")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting course:", error)
    return { error: error.message }
  }
}
