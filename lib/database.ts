import { supabase } from "./supabase"

// User related functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

// Course related functions
export async function getCourses(limit = 10, offset = 0, filters = {}) {
  let query = supabase
    .from("courses")
    .select("*, users!instructor_id(*)")
    .range(offset, offset + limit - 1)

  // Apply filters if any
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query = query.eq(key, value)
    }
  })

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getCourseById(courseId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*, users!instructor_id(*), modules(*)")
    .eq("id", courseId)
    .single()

  if (error) throw error
  return data
}

// Enrollment related functions
export async function getUserEnrollments(userId: string) {
  const { data, error } = await supabase.from("enrollments").select("*, courses(*)").eq("user_id", userId)

  if (error) throw error
  return data
}

export async function enrollInCourse(userId: string, courseId: string) {
  const { data, error } = await supabase
    .from("enrollments")
    .insert({
      user_id: userId,
      course_id: courseId,
      progress: 0,
      completed: false,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number) {
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

  if (error) throw error
  return data
}

// Module progress related functions
export async function getModuleProgress(userId: string, moduleId: string) {
  const { data, error } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .single()

  if (error && error.code !== "PGRST116") throw error // PGRST116 is "no rows returned"
  return data
}

export async function updateModuleProgress(userId: string, moduleId: string, completed: boolean) {
  // Check if record exists
  const existing = await getModuleProgress(userId, moduleId)

  if (existing) {
    const { data, error } = await supabase
      .from("module_progress")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", existing.id)
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from("module_progress")
      .insert({
        user_id: userId,
        module_id: moduleId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Forum related functions
export async function getDiscussions(limit = 10, offset = 0, category?: string) {
  let query = supabase
    .from("discussions")
    .select("*, users(*)")
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getDiscussionById(discussionId: string) {
  const { data, error } = await supabase.from("discussions").select("*, users(*)").eq("id", discussionId).single()

  if (error) throw error
  return data
}

export async function getDiscussionReplies(discussionId: string) {
  const { data, error } = await supabase
    .from("replies")
    .select("*, users(*)")
    .eq("discussion_id", discussionId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function createDiscussion(userId: string, title: string, content: string, category?: string) {
  const { data, error } = await supabase
    .from("discussions")
    .insert({
      user_id: userId,
      title,
      content,
      category,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createReply(userId: string, discussionId: string, content: string) {
  const { data, error } = await supabase
    .from("replies")
    .insert({
      user_id: userId,
      discussion_id: discussionId,
      content,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Resources related functions
export async function getResources(limit = 10, offset = 0, category?: string) {
  let query = supabase
    .from("resources")
    .select("*, users(*), courses(*)")
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

// Achievements related functions
export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase.from("user_achievements").select("*, achievements(*)").eq("user_id", userId)

  if (error) throw error
  return data
}

// Learning paths related functions
export async function getLearningPaths() {
  const { data, error } = await supabase.from("learning_paths").select("*")

  if (error) throw error
  return data
}

export async function getLearningPathById(pathId: string) {
  const { data, error } = await supabase
    .from("learning_paths")
    .select("*, learning_path_courses(*, courses(*))")
    .eq("id", pathId)
    .single()

  if (error) throw error
  return data
}

// Notifications related functions
export async function getUserNotifications(userId: string, limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

// User settings related functions
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function updateUserSettings(userId: string, settings: any) {
  const existing = await getUserSettings(userId)

  if (existing) {
    const { data, error } = await supabase
      .from("user_settings")
      .update({
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from("user_settings")
      .insert({
        user_id: userId,
        ...settings,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
