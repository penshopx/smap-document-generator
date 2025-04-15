"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn(formData)

      if (result?.error) {
        setError(result.error)
      } else {
        router.push(redirect)
        router.refresh()
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Masuk ke akun Anda untuk melanjutkan pembelajaran</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="nama@email.com" required disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Lupa password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required disabled={isLoading} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Daftar
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
