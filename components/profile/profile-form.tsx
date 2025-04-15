"use client"

import { useState } from "react"
import { Camera, User } from "lucide-react"
import { updateUserProfile } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ProfileFormProps {
  profile: any
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await updateUserProfile(formData)

      if (result.error) {
        toast({
          title: "Gagal memperbarui profil",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Profil diperbarui",
          description: "Perubahan profil Anda telah berhasil disimpan.",
        })
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memperbarui profil. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Foto Profil</CardTitle>
          <CardDescription>Foto ini akan ditampilkan di profil dan sertifikat Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt={profile.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload foto baru</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Ubah foto profil</h3>
              <p className="text-sm text-muted-foreground">
                Unggah foto dengan ukuran maksimal 1MB. Format yang didukung: JPG, PNG, atau GIF.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Unggah Foto
                </Button>
                <Button variant="ghost" size="sm">
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
            <CardDescription>Perbarui informasi pribadi Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <Input id="full_name" name="full_name" defaultValue={profile.full_name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email || ""} disabled />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" name="phone" defaultValue={profile.phone || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" name="location" defaultValue={profile.location || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" defaultValue={profile.bio || ""} className="min-h-[100px]" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job_title">Jabatan</Label>
                <Input id="job_title" name="job_title" defaultValue={profile.job_title || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Perusahaan</Label>
                <Input id="company" name="company" defaultValue={profile.company || ""} />
              </div>
            </div>

            <input type="hidden" name="avatar_url" value={profile.avatar_url || ""} />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
