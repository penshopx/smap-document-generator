"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to view your profile")
    }

    // Get user profile
    const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (error) {
      // If profile doesn't exist, create one
      if (error.code === "PGRST116") {
        const { data: newProfile, error: createError } = await supabase
          .from("users")
          .insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || "",
            avatar_url: session.user.user_metadata?.avatar_url || "",
          })
          .select()
          .single()

        if (createError) {
          throw new Error(createError.message)
        }

        return { data: newProfile }
      }

      throw new Error(error.message)
    }

    return { data }
  } catch (error: any) {
    console.error("Error fetching user profile:", error)
    return { error: error.message }
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to update your profile")
    }

    // Extract form data
    const full_name = formData.get("full_name") as string
    const bio = formData.get("bio") as string
    const job_title = formData.get("job_title") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const phone = formData.get("phone") as string
    const avatar_url = formData.get("avatar_url") as string

    // Update profile
    const { data, error } = await supabase
      .from("users")
      .update({
        full_name,
        bio,
        job_title,
        company,
        location,
        phone,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        full_name,
        avatar_url,
      },
    })

    revalidatePath("/profile")
    return { data }
  } catch (error: any) {
    console.error("Error updating user profile:", error)
    return { error: error.message }
  }
}

export async function updateUserSettings(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("You must be logged in to update your settings")
    }

    // Extract form data
    const theme = formData.get("theme") as string
    const language = formData.get("language") as string
    const email_notifications = formData.has("email_notifications")
    const push_notifications = formData.has("push_notifications")
    const sms_notifications = formData.has("sms_notifications")
    const marketing_emails = formData.has("marketing_emails")

    // Check if settings exist
    const { data: existingSettings } = await supabase
      .from("user_settings")
      .select("id")
      .eq("user_id", session.user.id)
      .single()

    let data
    let error

    if (existingSettings) {
      // Update existing settings
      const result = await supabase
        .from("user_settings")
        .update({
          theme,
          language,
          email_notifications,
          push_notifications,
          sms_notifications,
          marketing_emails,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingSettings.id)
        .select()
        .single()

      data = result.data
      error = result.error
    } else {
      // Create new settings
      const result = await supabase
        .from("user_settings")
        .insert({
          user_id: session.user.id,
          theme,
          language,
          email_notifications,
          push_notifications,
          sms_notifications,
          marketing_emails,
        })
        .select()
        .single()

      data = result.data
      error = result.error
    }

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/settings")
    return { data }
  } catch (error: any) {
    console.error("Error updating user settings:", error)
    return { error: error.message }
  }
}
