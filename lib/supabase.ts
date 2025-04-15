import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined. Please set this environment variable.")
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please set this environment variable.")
}

// Create Supabase client for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create Supabase admin client for server-side operations that need elevated privileges
export const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null

// Helper function for server components
export const createServerSupabaseClient = async () => {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = cookies()

    return createClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })
  } catch (error) {
    console.error("Error creating server Supabase client:", error)
    // Return regular client as fallback
    return supabase
  }
}
