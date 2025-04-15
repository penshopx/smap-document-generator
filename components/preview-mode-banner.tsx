"use client"

import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function PreviewModeBanner() {
  const { isPreviewMode } = useAuth()

  if (!isPreviewMode) return null

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Preview Mode</AlertTitle>
      <AlertDescription>
        Running in preview mode without Supabase credentials. Some features are simulated and data is static.
      </AlertDescription>
    </Alert>
  )
}
