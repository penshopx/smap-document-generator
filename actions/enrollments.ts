"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getUserEnrollments() {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to view enrollments")
    }

    // Get user enrollments
    const { data, error } = await supabase
      .from("enrollments")
      .select("*, courses(*)")
      .eq("user_id", session.user.id)
      .order("last_accessed", { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return { data }
  } catch (error: any) {
    console.error("Error fetching enrollments:", error)
    return { error: error.message, data: [] }
  }
}

export async function enrollInCourse(courseId: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to enroll in a course")
    }

    // Check if course exists
    const { data: course } = await supabase.from("courses").select("id").eq("id", courseId).single()

    if (!course) {
      throw new Error("Course not found")
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", courseId)
      .single()

    if (existingEnrollment) {
      throw new Error("You are already enrolled in this course")
    }

    // Create enrollment
    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        user_id: session.user.id,
        course_id: courseId,
        progress: 0,
        completed: false,
        last_accessed: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath(`/courses/${courseId}`)
    return { data }
  } catch (error: any) {
    console.error("Error enrolling in course:", error)
    return { error: error.message }
  }
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to update progress")
    }

    // Check if enrollment belongs to user
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("user_id, course_id")
      .eq("id", enrollmentId)
      .single()

    if (!enrollment || enrollment.user_id !== session.user.id) {
      throw new Error("You don't have permission to update this enrollment")
    }

    // Update enrollment
    const { data, error } = await supabase
      .from("enrollments")
      .update({
        progress,
        completed: progress === 100,
        last_accessed: new Date().toISOString(),
      })
      .eq("id", enrollmentId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath(`/courses/${enrollment.course_id}`)
    return { data }
  } catch (error: any) {
    console.error("Error updating enrollment progress:", error)
    return { error: error.message }
  }
}

export async function completeModule(moduleId: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to complete a module")
    }

    // Get module details
    const { data: module } = await supabase.from("modules").select("course_id").eq("id", moduleId).single()

    if (!module) {
      throw new Error("Module not found")
    }

    // Check if user is enrolled in the course
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", module.course_id)
      .single()

    if (!enrollment) {
      throw new Error("You are not enrolled in this course")
    }

    // Check if module progress already exists
    const { data: existingProgress } = await supabase
      .from("module_progress")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("module_id", moduleId)
      .single()

    let data
    let error

    if (existingProgress) {
      // Update existing progress
      const result = await supabase
        .from("module_progress")
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq("id", existingProgress.id)
        .select()
        .single()

      data = result.data
      error = result.error
    } else {
      // Create new progress
      const result = await supabase
        .from("module_progress")
        .insert({
          user_id: session.user.id,
          module_id: moduleId,
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      data = result.data
      error = result.error
    }

    if (error) {
      throw new Error(error.message)
    }

    // Update enrollment progress
    await updateCourseProgress(module.course_id)

    revalidatePath(`/courses/${module.course_id}`)
    return { data }
  } catch (error: any) {
    console.error("Error completing module:", error)
    return { error: error.message }
  }
}

// Helper function to update course progress
async function updateCourseProgress(courseId: string) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return
    }

    // Get all modules for the course
    const { data: modules } = await supabase.from("modules").select("id").eq("course_id", courseId)

    if (!modules || modules.length === 0) {
      return
    }

    // Get completed modules
    const { data: completedModules } = await supabase
      .from("module_progress")
      .select("module_id")
      .eq("user_id", session.user.id)
      .eq("completed", true)
      .in(
        "module_id",
        modules.map((m) => m.id),
      )

    // Calculate progress percentage
    const totalModules = modules.length
    const completedCount = completedModules?.length || 0
    const progress = Math.round((completedCount / totalModules) * 100)

    // Update enrollment
    await supabase
      .from("enrollments")
      .update({
        progress,
        completed: progress === 100,
        last_accessed: new Date().toISOString(),
      })
      .eq("user_id", session.user.id)
      .eq("course_id", courseId)
  } catch (error) {
    console.error("Error updating course progress:", error)
  }
}
