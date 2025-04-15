"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Course {
  courseId: string
  title: string
  description: string
  level: string
  category: string
  student_count: number
  image_url: string
}

export function InstructorCoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchInstructorCourses() {
      try {
        const response = await fetch("/api/instructor/courses")

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching instructor courses:", error)
        toast({
          title: "Error",
          description: "Failed to load your courses. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchInstructorCourses()
  }, [toast])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-muted" />
            <CardHeader>
              <div className="h-6 w-3/4 rounded-md bg-muted" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-4 w-full rounded-md bg-muted" />
              <div className="h-4 w-full rounded-md bg-muted" />
            </CardContent>
            <CardFooter>
              <div className="h-9 w-full rounded-md bg-muted" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Edit className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="mt-6">Belum ada kursus</CardTitle>
        <p className="mt-2 text-muted-foreground">
          Anda belum membuat kursus apapun. Mulai buat kursus pertama Anda sekarang.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/instructor/courses/create">Buat Kursus</Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.courseId} className="overflow-hidden">
          <img
            src={course.image_url || "/placeholder.svg?height=200&width=400&query=course"}
            alt={course.title}
            className="aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.student_count || 0}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/instructor/courses/${course.courseId}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/instructor/courses/${course.courseId}/modules`}>Modul</Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
