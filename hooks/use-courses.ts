"use client"

import { useState, useEffect } from "react"

interface Course {
  id: string
  title: string
  description: string
  level: string
  duration: number
  category: string
  image_url: string
  instructor_id: string
  created_at: string
  updated_at: string
  users: {
    full_name: string
    avatar_url: string
  }
}

interface CoursesResponse {
  data: Course[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export function useCourses(
  options: {
    category?: string
    level?: string
    limit?: number
    page?: number
  } = {},
) {
  const [courses, setCourses] = useState<Course[]>([])
  const [meta, setMeta] = useState<CoursesResponse["meta"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { category, level, limit = 10, page = 1 } = options

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)
        if (level) params.append("level", level)
        params.append("limit", limit.toString())
        params.append("page", page.toString())

        const response = await fetch(`/api/courses?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const { data, meta } = await response.json()
        setCourses(data)
        setMeta(meta)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [category, level, limit, page])

  return { courses, meta, loading, error }
}

export function useCourse(id: string) {
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/courses/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch course")
        }

        const { data } = await response.json()
        setCourse(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id])

  return { course, loading, error }
}
