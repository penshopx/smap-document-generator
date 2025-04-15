"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { enrollInCourse } from "@/actions/enrollments"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface EnrollButtonProps {
  courseId: string
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleEnroll = async () => {
    setIsLoading(true)
    try {
      const result = await enrollInCourse(courseId)

      if (result.error) {
        toast({
          title: "Gagal mendaftar",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Berhasil mendaftar",
          description: "Anda telah berhasil mendaftar untuk kursus ini.",
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal mendaftar untuk kursus ini. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full" onClick={handleEnroll} disabled={isLoading}>
      {isLoading ? "Memproses..." : "Daftar Kursus"}
    </Button>
  )
}
