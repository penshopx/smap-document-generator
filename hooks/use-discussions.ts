"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  full_name: string
  avatar_url: string
}

interface Discussion {
  id: string
  title: string
  content: string
  user_id: string
  category: string
  is_pinned: boolean
  is_hot: boolean
  views: number
  created_at: string
  updated_at: string
  users: User
}

interface Reply {
  id: string
  discussion_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  users: User
}

interface DiscussionDetail extends Discussion {
  replies: Reply[]
}

export function useDiscussions(
  options: {
    category?: string
    limit?: number
    page?: number
  } = {},
) {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { category, limit = 10, page = 1 } = options

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)
        params.append("limit", limit.toString())
        params.append("page", page.toString())

        const response = await fetch(`/api/discussions?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch discussions")
        }

        const { data, meta } = await response.json()
        setDiscussions(data)
        setMeta(meta)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [category, limit, page])

  return { discussions, meta, loading, error }
}

export function useDiscussion(id: string) {
  const [discussion, setDiscussion] = useState<DiscussionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiscussion = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/discussions/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch discussion")
        }

        const { data } = await response.json()
        setDiscussion(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDiscussion()
    }
  }, [id])

  const addReply = async (content: string) => {
    if (!id) {
      throw new Error("Discussion ID is required")
    }

    try {
      const response = await fetch(`/api/discussions/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add reply")
      }

      const { data } = await response.json()

      // Update local state
      if (discussion) {
        setDiscussion({
          ...discussion,
          replies: [...discussion.replies, data],
        })
      }

      return data
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { discussion, loading, error, addReply }
}
