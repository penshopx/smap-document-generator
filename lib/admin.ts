import { createAdminSupabaseClient } from "./supabase"

// Admin functions that require service role access

// Get all users (admin only)
export async function getAllUsers() {
  try {
    const supabase = createAdminSupabaseClient()

    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) throw error
    return { data: data.users }
  } catch (error: any) {
    console.error("Error fetching all users:", error)
    return { error: error.message }
  }
}

// Get user by ID (admin only)
export async function getUserById(userId: string) {
  try {
    const supabase = createAdminSupabaseClient()

    const { data, error } = await supabase.auth.admin.getUserById(userId)

    if (error) throw error
    return { data: data.user }
  } catch (error: any) {
    console.error(`Error fetching user ${userId}:`, error)
    return { error: error.message }
  }
}

// Delete user (admin only)
export async function deleteUser(userId: string) {
  try {
    const supabase = createAdminSupabaseClient()

    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error(`Error deleting user ${userId}:`, error)
    return { error: error.message }
  }
}

// Create course with bypassing RLS (admin or instructor only)
export async function createCourseAdmin(courseData: any) {
  try {
    const supabase = createAdminSupabaseClient()

    const { data, error } = await supabase.from("courses").insert(courseData).select().single()

    if (error) throw error
    return { data }
  } catch (error: any) {
    console.error("Error creating course:", error)
    return { error: error.message }
  }
}

// Update course with bypassing RLS (admin or instructor only)
export async function updateCourseAdmin(courseId: string, courseData: any) {
  try {
    const supabase = createAdminSupabaseClient()

    const { data, error } = await supabase.from("courses").update(courseData).eq("id", courseId).select().single()

    if (error) throw error
    return { data }
  } catch (error: any) {
    console.error(`Error updating course ${courseId}:`, error)
    return { error: error.message }
  }
}

// Delete course with bypassing RLS (admin or instructor only)
export async function deleteCourseAdmin(courseId: string) {
  try {
    const supabase = createAdminSupabaseClient()

    const { error } = await supabase.from("courses").delete().eq("id", courseId)

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error(`Error deleting course ${courseId}:`, error)
    return { error: error.message }
  }
}

// Get all enrollments for a course (admin or instructor only)
export async function getCourseEnrollmentsAdmin(courseId: string) {
  try {
    const supabase = createAdminSupabaseClient()

    const { data, error } = await supabase.from("enrollments").select("*, users(*)").eq("course_id", courseId)

    if (error) throw error
    return { data }
  } catch (error: any) {
    console.error(`Error fetching enrollments for course ${courseId}:`, error)
    return { error: error.message }
  }
}

// Generate platform statistics (admin only)
export async function getPlatformStatistics() {
  try {
    const supabase = createAdminSupabaseClient()

    // Get total users count
    const { count: usersCount, error: usersError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })

    if (usersError) throw usersError

    // Get total courses count
    const { count: coursesCount, error: coursesError } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true })

    if (coursesError) throw coursesError

    // Get total enrollments count
    const { count: enrollmentsCount, error: enrollmentsError } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })

    if (enrollmentsError) throw enrollmentsError

    // Get completed courses count
    const { count: completedCount, error: completedError } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("completed", true)

    if (completedError) throw completedError

    return {
      data: {
        usersCount: usersCount || 0,
        coursesCount: coursesCount || 0,
        enrollmentsCount: enrollmentsCount || 0,
        completedCount: completedCount || 0,
        completionRate: enrollmentsCount ? Math.round(((completedCount || 0) / enrollmentsCount) * 100) : 0,
      },
    }
  } catch (error: any) {
    console.error("Error generating platform statistics:", error)
    return { error: error.message }
  }
}
