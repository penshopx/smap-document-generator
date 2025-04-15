import { ArrowLeft, Book, Calendar, Clock, FileText, Users, Video } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for a specific course
const getCourse = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "Dasar-Dasar Kelistrikan",
    description:
      "Pelajari konsep dasar kelistrikan, komponen, dan aplikasinya dalam industri. Kursus ini dirancang untuk pemula yang ingin memahami prinsip-prinsip dasar kelistrikan dan penerapannya dalam berbagai konteks industri.",
    level: "Pemula",
    duration: "4 jam",
    students: 128,
    category: "Kelistrikan",
    instructor: "Dr. Budi Santoso",
    lastUpdated: "10 Maret 2023",
    progress: 35,
    image: "/placeholder.svg?height=300&width=800",
    modules: [
      {
        id: 1,
        title: "Pengenalan Kelistrikan",
        duration: "45 menit",
        type: "video",
        completed: true,
      },
      {
        id: 2,
        title: "Komponen Dasar Listrik",
        duration: "60 menit",
        type: "video",
        completed: true,
      },
      {
        id: 3,
        title: "Rangkaian Listrik Sederhana",
        duration: "75 menit",
        type: "video",
        completed: false,
      },
      {
        id: 4,
        title: "Kuis Tengah Kursus",
        duration: "30 menit",
        type: "quiz",
        completed: false,
      },
      {
        id: 5,
        title: "Aplikasi Kelistrikan dalam Industri",
        duration: "60 menit",
        type: "video",
        completed: false,
      },
      {
        id: 6,
        title: "Ujian Akhir",
        duration: "45 menit",
        type: "exam",
        completed: false,
      },
    ],
    resources: [
      {
        id: 1,
        title: "Panduan Dasar Kelistrikan",
        type: "pdf",
        size: "2.4 MB",
      },
      {
        id: 2,
        title: "Diagram Rangkaian",
        type: "pdf",
        size: "1.8 MB",
      },
      {
        id: 3,
        title: "Glosarium Istilah Kelistrikan",
        type: "doc",
        size: "850 KB",
      },
    ],
  }
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id)

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
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-auto" />
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
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.students} siswa</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Diperbarui {course.lastUpdated}</span>
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
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 border rounded-lg flex items-center justify-between ${
                      module.completed ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {module.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
                      {module.type === "quiz" && <FileText className="h-5 w-5 text-green-500" />}
                      {module.type === "exam" && <FileText className="h-5 w-5 text-orange-500" />}
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                      </div>
                    </div>
                    <Button variant={module.completed ? "outline" : "default"} size="sm">
                      {module.completed ? "Selesai" : "Mulai"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-4">
                {course.resources.map((resource) => (
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
                    <Button variant="outline" size="sm">
                      Unduh
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Progres Kursus</CardTitle>
              <CardDescription>Anda telah menyelesaikan {course.progress}% dari kursus ini</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="mb-4" />
              <Button className="w-full mb-4">Lanjutkan Belajar</Button>
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Instruktur</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="font-medium">BS</span>
                    </div>
                    <div>
                      <p className="font-medium">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Pakar Kelistrikan</p>
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
