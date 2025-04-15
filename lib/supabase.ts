import { createClient } from "@supabase/supabase-js"

// Default values for development - ONLY USE FOR PREVIEW
const defaultSupabaseUrl = "https://placeholder-supabase-url.supabase.co"
const defaultSupabaseAnonKey = "placeholder-anon-key"

// Use environment variables if available, otherwise use defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultSupabaseAnonKey

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Create client with validation
export const supabase = createClient(isValidUrl(supabaseUrl) ? supabaseUrl : defaultSupabaseUrl, supabaseAnonKey)

// Helper function for server components
export const createServerSupabaseClient = async () => {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = cookies()

    // Use environment variables if available, otherwise use defaults
    const serverSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl
    const serverSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultSupabaseAnonKey

    return createClient(isValidUrl(serverSupabaseUrl) ? serverSupabaseUrl : defaultSupabaseUrl, serverSupabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })
  } catch (error) {
    console.error("Error creating server Supabase client:", error)

    // Return a dummy client that won't throw errors in preview mode
    return createClient(defaultSupabaseUrl, defaultSupabaseAnonKey)
  }
}
