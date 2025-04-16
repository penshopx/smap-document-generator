import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

// URL validation helper
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  console.error("Invalid or missing NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

if (!supabaseServiceKey) {
  console.warn("Missing SUPABASE_SERVICE_ROLE_KEY - some admin functions may not work")
}

// Create a Supabase client for server components
export const createServerSupabaseClient = async () => {
  const cookieStore = cookies()

  return createClient<Database>(supabaseUrl || "", supabaseAnonKey || "", {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

// Create a Supabase client with service role for admin operations
export const createAdminSupabaseClient = () => {
  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined")
  }

  return createClient<Database>(supabaseUrl || "", supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Create a Supabase client for client components
export const supabase = createClient<Database>(supabaseUrl || "", supabaseAnonKey || "")
