import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecommendedCourses() {
  // Mock data for recommended courses
  const courses = [
    {
      id: 1,
      title: "Dasar Energi Terbarukan",
      category: "Energi",
      image: "/sustainable-future.png",
      courseId: 1,
    },
    {
      id: 2,
      title: "Keselamatan Kerja Lanjutan",
      category: "Keselamatan",
      image: "/construction-site-safety.png",
      courseId: 2,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekomendasi Kursus</CardTitle>
        <CardDescription>Kursus yang mungkin Anda minati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.courseId}`}
              className="group overflow-hidden rounded-lg border transition-colors hover:border-primary"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-3">
                <h3 className="font-medium group-hover:text-primary">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.category}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href="/courses">Lihat Semua Kursus</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
