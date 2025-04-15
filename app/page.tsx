import { ArrowRight, BookOpen, Calendar, BadgeIcon as Certificate, Clock, Target } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudyProgressTracker } from "@/components/study-progress-tracker"

// Mock data for dashboard
const userData = {
  name: "Budi Santoso",
  enrolledCourses: 4,
  completedCourses: 2,
  totalHoursLearned: 28,
  certificates: 3,
  upcomingEvents: 2,
  inProgressCourses: [
    {
      id: 1,
      title: "Dasar-Dasar Kelistrikan",
      progress: 75,
      lastAccessed: "2 hari yang lalu",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Pengenalan Energi Terbarukan",
      progress: 45,
      lastAccessed: "1 minggu yang lalu",
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
  recommendedCourses: [
    {
      id: 2,
      title: "Keselamatan Kerja di Pertambangan",
      level: "Menengah",
      duration: "6 jam",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "Teknik Konstruksi Modern",
      level: "Lanjutan",
      duration: "8 jam",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "Manajemen Proyek Energi",
      level: "Menengah",
      duration: "5 jam",
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
  upcomingSchedule: [
    {
      id: 1,
      title: "Webinar: Inovasi dalam Energi Terbarukan",
      date: "15 Juni 2023",
      time: "10:00 - 12:00",
      type: "webinar",
    },
    {
      id: 2,
      title: "Workshop Keselamatan Kerja di Pertambangan",
      date: "18 Juni 2023",
      time: "09:00 - 16:00",
      type: "workshop",
    },
  ],
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Selamat Datang, {userData.name}</h1>
          <p className="text-muted-foreground">Lanjutkan perjalanan pembelajaran Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/courses">Jelajahi Kursus</Link>
          </Button>
          <Button asChild>
            <Link href="/schedule">Jadwal Saya</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Kursus Terdaftar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.enrolledCourses}</div>
            <p className="text-xs text-muted-foreground">{userData.completedCourses} kursus selesai</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Jam Belajar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalHoursLearned} jam</div>
            <p className="text-xs text-muted-foreground">Minggu ini: 5 jam</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sertifikat</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.certificates}</div>
            <p className="text-xs text-muted-foreground">1 sertifikat baru bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jadwal Mendatang</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Dalam 7 hari ke depan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kursus Sedang Berlangsung</CardTitle>
            <CardDescription>Lanjutkan pembelajaran Anda dari tempat terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userData.inProgressCourses.map((course) => (
                <div key={course.id} className="flex flex-col md:flex-row gap-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="rounded-md w-full md:w-[120px] h-auto object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-muted-foreground">Terakhir diakses: {course.lastAccessed}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>
                        Lanjutkan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/courses">Lihat Semua Kursus</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Mendatang</CardTitle>
            <CardDescription>Acara yang akan datang dalam 7 hari ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.upcomingSchedule.map((event) => (
                <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/planner">Lihat Semua Jadwal</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-6">
        <StudyProgressTracker />
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi Kursus</CardTitle>
            <CardDescription>Berdasarkan minat dan riwayat pembelajaran Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.recommendedCourses.map((course) => (
                <div key={course.id} className="flex gap-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="rounded-md w-[80px] h-[80px] object-cover"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <div className="text-sm text-muted-foreground mb-1">Level: {course.level}</div>
                    <div className="text-sm text-muted-foreground mb-2">Durasi: {course.duration}</div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/courses/${course.id}`}>Lihat Detail</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/courses">Jelajahi Semua Kursus</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Target Pembelajaran</CardTitle>
            <CardDescription>Pantau kemajuan target pembelajaran Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Mingguan</TabsTrigger>
                <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                <TabsTrigger value="yearly">Tahunan</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Jam Belajar</p>
                        <div className="text-2xl font-bold">5 / 10 jam</div>
                      </div>
                      <Target className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Modul Selesai</p>
                        <div className="text-2xl font-bold">8 / 12 modul</div>
                      </div>
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Jam Belajar</p>
                        <div className="text-2xl font-bold">18 / 40 jam</div>
                      </div>
                      <Target className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Kursus Selesai</p>
                        <div className="text-2xl font-bold">1 / 2 kursus</div>
                      </div>
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="yearly">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Jam Belajar</p>
                        <div className="text-2xl font-bold">120 / 300 jam</div>
                      </div>
                      <Target className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sertifikat Diperoleh</p>
                        <div className="text-2xl font-bold">3 / 8 sertifikat</div>
                      </div>
                      <Certificate className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={37.5} className="h-2" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
