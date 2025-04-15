"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isPreviewMode: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if we're in preview mode (no real Supabase credentials)
  const isPreviewMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  useEffect(() => {
    // Skip auth in preview mode
    if (isPreviewMode) {
      setIsLoading(false)
      return
    }

    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        }

        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Unexpected error during getSession:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isPreviewMode])

  const signIn = async (email: string, password: string) => {
    if (isPreviewMode) {
      return { error: null } // Mock successful sign in for preview
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      console.error("Error during sign in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string) => {
    if (isPreviewMode) {
      return { error: null } // Mock successful sign up for preview
    }

    try {
      const { error } = await supabase.auth.signUp({ email, password })
      return { error }
    } catch (error) {
      console.error("Error during sign up:", error)
      return { error }
    }
  }

  const signOut = async () => {
    if (isPreviewMode) {
      return // No-op for preview mode
    }

    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error during sign out:", error)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isPreviewMode,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
