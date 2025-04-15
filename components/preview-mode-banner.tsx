"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect } from "react"

export function PreviewModeBanner() {
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    // Check if we're in preview mode by checking if Supabase environment variables are missing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      setIsPreview(true)
    }
  }, [])

  if (!isPreview) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Preview Mode</AlertTitle>
      <AlertDescription>
        This application is running in preview mode without Supabase credentials. Some features may not work correctly.
        Please set up your Supabase environment variables to enable full functionality.
      </AlertDescription>
    </Alert>
  )
}
