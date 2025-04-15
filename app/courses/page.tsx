import { getCourses } from "@/actions/courses"
import { Book, Clock, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { category?: string; level?: string; page?: string; limit?: string }
}) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? Number.parseInt(searchParams.limit) : 9

  const {
    data: courses,
    meta,
    error,
  } = await getCourses({
    category: searchParams.category,
    level: searchParams.level,
    page,
    limit,
  })

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/courses">Coba Lagi</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kursus Tersedia</h1>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Urutkan</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <img
              src={course.image_url || "/placeholder.svg?height=200&width=400&query=course"}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} menit</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.student_count || 0} siswa</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>Lihat Kursus</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/courses?page=${page - 1}&limit=${limit}`}>Sebelumnya</Link>
              </Button>
            )}

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button key={pageNum} variant={pageNum === page ? "default" : "outline"} asChild>
                <Link href={`/courses?page=${pageNum}&limit=${limit}`}>{pageNum}</Link>
              </Button>
            ))}

            {page < meta.totalPages && (
              <Button variant="outline" asChild>
                <Link href={`/courses?page=${page + 1}&limit=${limit}`}>Selanjutnya</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
