"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Profile {
  id: string
  full_name: string
  avatar_url: string
  bio: string
  job_title: string
  company: string
  location: string
  created_at: string
  updated_at: string
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/profile")

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const { data } = await response.json()
        setProfile(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) {
      throw new Error("You must be logged in to update your profile")
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      const { data } = await response.json()
      setProfile(data)

      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { profile, loading, error, updateProfile }
}
