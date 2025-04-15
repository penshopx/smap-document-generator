"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EnrolledCoursesProps {
  enrollments: any[]
  className?: string
}

export function EnrolledCourses({ enrollments, className }: EnrolledCoursesProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Kursus Saya</CardTitle>
          <CardDescription>Kursus yang sedang Anda pelajari</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/courses">
            Lihat Semua
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {enrollments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {enrollments.slice(0, 4).map((enrollment) => (
              <Link
                key={enrollment.id}
                href={`/courses/${enrollment.course_id}`}
                className="group block space-y-2 rounded-lg border p-4 transition-all hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-medium group-hover:underline">{enrollment.courses.title}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{enrollment.progress}%</div>
                </div>
                <Progress value={enrollment.progress} />
                <div className="text-xs text-muted-foreground">
                  Terakhir diakses: {new Date(enrollment.last_accessed).toLocaleDateString("id-ID")}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Belum ada kursus</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Anda belum mendaftar ke kursus apapun. Jelajahi kursus yang tersedia dan mulai belajar.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/courses">Jelajahi Kursus</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
