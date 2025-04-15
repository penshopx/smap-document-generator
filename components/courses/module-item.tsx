"use client"

import { useState } from "react"
import { FileText, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { completeModule } from "@/actions/enrollments"
import { useToast } from "@/components/ui/use-toast"

interface ModuleItemProps {
  module: {
    id: string
    title: string
    duration: number
    type: string
    sort_order: number
    completed?: boolean
  }
  isEnrolled: boolean
}

export default function ModuleItem({ module, isEnrolled }: ModuleItemProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(module.completed || false)
  const { toast } = useToast()

  const handleComplete = async () => {
    if (!isEnrolled) {
      toast({
        title: "Anda belum terdaftar",
        description: "Silakan daftar untuk kursus ini terlebih dahulu.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await completeModule(module.id)

      if (result.error) {
        toast({
          title: "Gagal menyelesaikan modul",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setIsCompleted(true)
        toast({
          title: "Modul selesai",
          description: "Progres Anda telah diperbarui.",
        })
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal menyelesaikan modul. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`p-4 border rounded-lg flex items-center justify-between ${isCompleted ? "bg-muted/50" : ""}`}>
      <div className="flex items-center gap-3">
        {module.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
        {module.type === "quiz" && <FileText className="h-5 w-5 text-green-500" />}
        {module.type === "exam" && <FileText className="h-5 w-5 text-orange-500" />}
        <div>
          <p className="font-medium">{module.title}</p>
          <p className="text-sm text-muted-foreground">{module.duration} menit</p>
        </div>
      </div>
      <Button
        variant={isCompleted ? "outline" : "default"}
        size="sm"
        disabled={isLoading || (!isEnrolled && !isCompleted)}
        onClick={handleComplete}
      >
        {isLoading ? "Memproses..." : isCompleted ? "Selesai" : "Tandai Selesai"}
      </Button>
    </div>
  )
}
