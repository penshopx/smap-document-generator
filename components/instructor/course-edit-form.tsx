"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateCourse } from "@/actions/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface CourseEditFormProps {
  course: any
}

export function CourseEditForm({ course }: CourseEditFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await updateCourse(course.id, formData)

      if (result.error) {
        toast({
          title: "Gagal memperbarui kursus",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Kursus berhasil diperbarui",
          description: "Perubahan pada kursus Anda telah berhasil disimpan.",
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memperbarui kursus. Silakan coba lagi.",
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
            <Input id="title" name="title" defaultValue={course.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={course.description}
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select name="category" defaultValue={course.category} required>
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
              <Select name="level" defaultValue={course.level} required>
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
            <Input id="duration" name="duration" type="number" min="1" defaultValue={course.duration} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL Gambar</Label>
            <Input
              id="image_url"
              name="image_url"
              defaultValue={course.image_url}
              placeholder="URL gambar untuk kursus (opsional)"
            />
            <p className="text-xs text-muted-foreground">
              Masukkan URL gambar untuk kursus Anda. Jika tidak diisi, gambar default akan digunakan.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
