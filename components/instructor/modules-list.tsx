"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Grip, Pencil, Trash2, Video } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface ModulesListProps {
  courseId: string
  modules: any[]
}

export function ModulesList({ courseId, modules }: ModulesListProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/instructor/modules/${moduleId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete module")
      }

      toast({
        title: "Modul berhasil dihapus",
        description: "Modul telah berhasil dihapus dari kursus.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting module:", error)
      toast({
        title: "Gagal menghapus modul",
        description: "Terjadi kesalahan saat menghapus modul. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (modules.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="mt-6">Belum ada modul</CardTitle>
        <p className="mt-2 text-muted-foreground">
          Kursus ini belum memiliki modul. Tambahkan modul untuk mulai membuat konten pembelajaran.
        </p>
        <Button className="mt-6" asChild>
          <Link href={`/instructor/courses/${courseId}/modules/create`}>Tambah Modul</Link>
        </Button>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Modul</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div key={module.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Grip className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                  {module.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
                  {module.type === "quiz" && <FileText className="h-5 w-5 text-green-500" />}
                  {module.type === "exam" && <FileText className="h-5 w-5 text-orange-500" />}
                  <div>
                    <p className="font-medium">{module.title}</p>
                    <p className="text-sm text-muted-foreground">{module.duration} menit</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/instructor/courses/${courseId}/modules/${module.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  disabled={isLoading}
                  onClick={() => handleDeleteModule(module.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
