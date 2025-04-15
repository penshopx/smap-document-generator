import { ArrowRight, BookOpen, CheckCircle, Clock, Star, Target } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for learning paths
const learningPaths = [
  {
    id: 1,
    title: "Teknisi Kelistrikan Dasar",
    description: "Jalur pembelajaran untuk menjadi teknisi kelistrikan tingkat dasar",
    progress: 65,
    totalCourses: 5,
    completedCourses: 3,
    estimatedTime: "3 bulan",
    level: "Pemula",
    skills: ["Dasar Kelistrikan", "Rangkaian Listrik", "Keselamatan Kerja"],
    image: "/placeholder.svg?height=100&width=200",
    courses: [
      {
        id: 1,
        title: "Dasar-Dasar Kelistrikan",
        status: "completed",
        progress: 100,
        duration: "4 jam",
      },
      {
        id: 2,
        title: "Rangkaian Listrik Dasar",
        status: "completed",
        progress: 100,
        duration: "6 jam",
      },
      {
        id: 3,
        title: "Keselamatan Kerja di Bidang Kelistrikan",
        status: "completed",
        progress: 100,
        duration: "3 jam",
      },
      {
        id: 4,
        title: "Pengukuran Listrik",
        status: "in-progress",
        progress: 60,
        duration: "5 jam",
      },
      {
        id: 5,
        title: "Instalasi Listrik Dasar",
        status: "not-started",
        progress: 0,
        duration: "8 jam",
      },
    ],
  },
  {
    id: 2,
    title: "Spesialis Energi Terbarukan",
    description: "Jalur pembelajaran untuk spesialisasi di bidang energi terbarukan",
    progress: 30,
    totalCourses: 6,
    completedCourses: 2,
    estimatedTime: "4 bulan",
    level: "Menengah",
    skills: ["Energi Surya", "Energi Angin", "Sistem Penyimpanan Energi"],
    image: "/placeholder.svg?height=100&width=200",
    courses: [
      {
        id: 6,
        title: "Pengenalan Energi Terbarukan",
        status: "completed",
        progress: 100,
        duration: "3 jam",
      },
      {
        id: 7,
        title: "Dasar Teknologi Panel Surya",
        status: "completed",
        progress: 100,
        duration: "5 jam",
      },
      {
        id: 8,
        title: "Sistem Turbin Angin",
        status: "in-progress",
        progress: 45,
        duration: "6 jam",
      },
      {
        id: 9,
        title: "Instalasi Sistem Panel Surya",
        status: "not-started",
        progress: 0,
        duration: "8 jam",
      },
      {
        id: 10,
        title: "Penyimpanan Energi dan Baterai",
        status: "not-started",
        progress: 0,
        duration: "4 jam",
      },
      {
        id: 11,
        title: "Integrasi Sistem Energi Terbarukan",
        status: "not-started",
        progress: 0,
        duration: "7 jam",
      },
    ],
  },
  {
    id: 3,
    title: "Ahli Keselamatan Pertambangan",
    description: "Jalur pembelajaran untuk menjadi ahli keselamatan di industri pertambangan",
    progress: 10,
    totalCourses: 5,
    completedCourses: 0,
    estimatedTime: "5 bulan",
    level: "Lanjutan",
    skills: ["Keselamatan Tambang", "Manajemen Risiko", "Regulasi Pertambangan"],
    image: "/placeholder.svg?height=100&width=200",
    courses: [
      {
        id: 12,
        title: "Pengantar Keselamatan Pertambangan",
        status: "in-progress",
        progress: 25,
        duration: "4 jam",
      },
      {
        id: 13,
        title: "Identifikasi Bahaya di Pertambangan",
        status: "not-started",
        progress: 0,
        duration: "6 jam",
      },
      {
        id: 14,
        title: "Manajemen Risiko Pertambangan",
        status: "not-started",
        progress: 0,
        duration: "7 jam",
      },
      {
        id: 15,
        title: "Regulasi dan Standar Keselamatan",
        status: "not-started",
        progress: 0,
        duration: "5 jam",
      },
      {
        id: 16,
        title: "Sistem Manajemen Keselamatan Terpadu",
        status: "not-started",
        progress: 0,
        duration: "8 jam",
      },
    ],
  },
]

// Mock data for recommended paths
const recommendedPaths = [
  {
    id: 4,
    title: "Teknisi Konstruksi Bangunan",
    description: "Jalur pembelajaran untuk menjadi teknisi konstruksi bangunan",
    totalCourses: 6,
    estimatedTime: "4 bulan",
    level: "Menengah",
    skills: ["Dasar Konstruksi", "Bahan Bangunan", "Teknik Pengukuran"],
    image: "/placeholder.svg?height=100&width=200",
    match: 85,
  },
  {
    id: 5,
    title: "Spesialis Otomasi Industri",
    description: "Jalur pembelajaran untuk spesialisasi di bidang otomasi industri",
    totalCourses: 7,
    estimatedTime: "6 bulan",
    level: "Lanjutan",
    skills: ["PLC", "SCADA", "Sensor dan Aktuator"],
    image: "/placeholder.svg?height=100&width=200",
    match: 72,
  },
]

// Helper function to get status badge variant
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "default"
    case "not-started":
      return "outline"
    default:
      return "outline"
  }
}

// Helper function to get status label
const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Selesai"
    case "in-progress":
      return "Sedang Berlangsung"
    case "not-started":
      return "Belum Dimulai"
    default:
      return "Tidak Diketahui"
  }
}

export default function LearningPathPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Jalur Pembelajaran</h1>
          <p className="text-muted-foreground">Jalur pembelajaran yang dipersonalisasi untuk Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/courses">Jelajahi Kursus</Link>
          </Button>
          <Button asChild>
            <Link href="/skills">Penilaian Keterampilan</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-paths">
        <TabsList className="mb-6">
          <TabsTrigger value="my-paths">Jalur Saya</TabsTrigger>
          <TabsTrigger value="recommended">Rekomendasi</TabsTrigger>
          <TabsTrigger value="all-paths">Semua Jalur</TabsTrigger>
        </TabsList>

        <TabsContent value="my-paths">
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 lg:w-1/4 bg-muted p-6">
                    <div className="space-y-4">
                      <img
                        src={path.image || "/placeholder.svg"}
                        alt={path.title}
                        className="rounded-md w-full h-auto object-cover mb-4"
                      />
                      <div>
                        <h3 className="font-semibold mb-1">{path.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {path.completedCourses}/{path.totalCourses} kursus
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{path.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>{path.level}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Keterampilan</p>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 lg:w-3/4 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Kursus dalam Jalur Ini</h3>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/learning-path/${path.id}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {path.courses.map((course, index) => (
                        <div key={course.id} className="relative">
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  course.status === "completed"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                    : course.status === "in-progress"
                                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {course.status === "completed" ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              {index < path.courses.length - 1 && <div className="w-0.5 h-12 bg-border mx-auto" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                  <h4 className="font-medium">{course.title}</h4>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <Badge variant={getStatusBadgeVariant(course.status)}>
                                      {getStatusLabel(course.status)}
                                    </Badge>
                                    <span>Durasi: {course.duration}</span>
                                  </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                  {course.status === "completed" ? (
                                    <Button variant="outline" size="sm">
                                      Lihat Ulang
                                    </Button>
                                  ) : course.status === "in-progress" ? (
                                    <Button size="sm">Lanjutkan</Button>
                                  ) : (
                                    <Button variant="outline" size="sm">
                                      Mulai
                                    </Button>
                                  )}
                                </div>
                              </div>
                              {course.status === "in-progress" && (
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                      <span className="text-primary font-bold">{path.match}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <img
                      src={path.image || "/placeholder.svg"}
                      alt={path.title}
                      className="rounded-md w-[100px] h-[100px] object-cover"
                    />
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{path.totalCourses} kursus</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{path.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>{path.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span>Kesesuaian: {path.match}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Keterampilan</p>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/learning-path/${path.id}`}>Lihat Detail</Link>
                  </Button>
                  <Button>Daftar Jalur</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-paths">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...learningPaths, ...recommendedPaths].map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={path.image || "/placeholder.svg"}
                    alt={path.title}
                    className="rounded-md w-full h-[150px] object-cover mb-4"
                  />
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{path.totalCourses} kursus</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{path.level}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Keterampilan</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/learning-path/${path.id}`}>
                      Lihat Detail
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
