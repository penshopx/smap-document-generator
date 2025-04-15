"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setError(error.message)
      } else {
        setSuccess("Password berhasil diubah")
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Buat password baru untuk akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password Baru</Label>
              <Input id="password" name="password" type="password" required disabled={isLoading} minLength={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Reset Password"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Ingat password Anda?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Kembali ke login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
