"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SecurityForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Kata sandi diperbarui",
        description: "Kata sandi Anda telah berhasil diperbarui.",
      })

      // Reset form
      e.currentTarget.reset()
    }, 1000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Keamanan Akun</CardTitle>
          <CardDescription>Kelola kata sandi dan keamanan akun Anda</CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordChange}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
              <Input id="current-password" name="current-password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Kata Sandi Baru</Label>
              <Input id="new-password" name="new-password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Memperbarui..." : "Perbarui Kata Sandi"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autentikasi Dua Faktor</CardTitle>
          <CardDescription>Tingkatkan keamanan akun Anda dengan autentikasi dua faktor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Autentikasi Dua Faktor</div>
              <div className="text-sm text-muted-foreground">Tambahkan lapisan keamanan tambahan untuk akun Anda</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Autentikasi Aplikasi</div>
              <div className="text-sm text-muted-foreground">
                Gunakan aplikasi autentikator seperti Google Authenticator
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Autentikasi SMS</div>
              <div className="text-sm text-muted-foreground">Terima kode verifikasi melalui pesan teks (SMS)</div>
            </div>
            <Switch />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Konfigurasi 2FA</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
