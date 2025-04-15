"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCourse } from "@/actions/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function CourseForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await createCourse(formData)

      if (result.error) {
        toast({
          title: "Gagal membuat kursus",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Kursus berhasil dibuat",
          description: "Kursus Anda telah berhasil dibuat.",
        })
        router.push(`/instructor/courses/${result.data.id}`)
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal membuat kursus. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle>Informasi Kursus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kursus</Label>
            <Input id="title" name="title" placeholder="Masukkan judul kursus" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Jelaskan tentang kursus ini"
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kelistrikan">Kelistrikan</SelectItem>
                  <SelectItem value="Pertambangan">Pertambangan</SelectItem>
                  <SelectItem value="Energi Terbarukan">Energi Terbarukan</SelectItem>
                  <SelectItem value="Konstruksi">Konstruksi</SelectItem>
                  <SelectItem value="Keselamatan Kerja">Keselamatan Kerja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Tingkat Kesulitan</Label>
              <Select name="level" required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tingkat kesulitan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pemula">Pemula</SelectItem>
                  <SelectItem value="Menengah">Menengah</SelectItem>
                  <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durasi (menit)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              placeholder="Estimasi durasi kursus dalam menit"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL Gambar</Label>
            <Input id="image_url" name="image_url" placeholder="URL gambar untuk kursus (opsional)" />
            <p className="text-xs text-muted-foreground">
              Masukkan URL gambar untuk kursus Anda. Jika tidak diisi, gambar default akan digunakan.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Membuat..." : "Buat Kursus"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
