import { getCourseById } from "@/actions/courses"
import { ArrowLeft, Book, Calendar, Clock, FileText, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnrollButton from "@/components/courses/enroll-button"
import ModuleItem from "@/components/courses/module-item"

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { data: course, error } = await getCourseById(params.courseId)

  if (error || !course) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Kursus
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={course.image_url || "/placeholder.svg?height=300&width=800&query=course"}
              alt={course.title}
              className="w-full h-auto"
            />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <Badge variant="outline">{course.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Book className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.duration} menit</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.student_count || 0} siswa</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Diperbarui {new Date(course.updated_at).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Konten Kursus</TabsTrigger>
              <TabsTrigger value="resources">Materi Pendukung</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <div className="space-y-4">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module) => (
                    <ModuleItem key={module.id} module={module} isEnrolled={!!course.enrollment} />
                  ))
                ) : (
                  <p className="text-muted-foreground">Belum ada modul untuk kursus ini.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-4">
                {course.resources && course.resources.length > 0 ? (
                  course.resources.map((resource) => (
                    <div key={resource.id} className="p-4 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.type.toUpperCase()} • {resource.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Unduh
                        </a>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Belum ada materi pendukung untuk kursus ini.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Progres Kursus</CardTitle>
              {course.enrollment ? (
                <CardDescription>
                  Anda telah menyelesaikan {course.enrollment.progress}% dari kursus ini
                </CardDescription>
              ) : (
                <CardDescription>Daftar untuk mulai belajar</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {course.enrollment ? (
                <>
                  <Progress value={course.enrollment.progress} className="mb-4" />
                  <Button className="w-full mb-4">Lanjutkan Belajar</Button>
                </>
              ) : (
                <EnrollButton courseId={course.id} />
              )}
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Instruktur</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {course.users?.avatar_url ? (
                        <img
                          src={course.users.avatar_url || "/placeholder.svg"}
                          alt={course.users.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-medium">{course.users?.full_name?.charAt(0) || "?"}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{course.users?.full_name}</p>
                      <p className="text-sm text-muted-foreground">{course.users?.job_title || "Instruktur"}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Sertifikat</h3>
                  <p className="text-sm text-muted-foreground">
                    Selesaikan kursus ini untuk mendapatkan sertifikat keahlian.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
