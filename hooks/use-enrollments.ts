"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Enrollment {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed: boolean
  last_accessed: string
  created_at: string
  updated_at: string
  courses: {
    id: string
    title: string
    description: string
    level: string
    duration: number
    category: string
    image_url: string
  }
}

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) {
        setEnrollments([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/enrollments")

        if (!response.ok) {
          throw new Error("Failed to fetch enrollments")
        }

        const { data } = await response.json()
        setEnrollments(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [user])

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      throw new Error("You must be logged in to enroll in a course")
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_id: courseId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to enroll in course")
      }

      const { data } = await response.json()
      setEnrollments([...enrollments, data])

      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { enrollments, loading, error, enrollInCourse }
}
