"use client"

import { useState } from "react"
import { LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "lucide-react"

// Mock data for analytics
const overviewData = {
  totalCoursesEnrolled: 12,
  coursesCompleted: 7,
  totalHoursLearned: 87,
  averageScore: 85,
  certificatesEarned: 5,
  skillsAcquired: 14,
  learningStreak: 15,
  forumParticipation: 23,
}

const weeklyProgressData = [
  { day: "Senin", hours: 2.5 },
  { day: "Selasa", hours: 1.8 },
  { day: "Rabu", hours: 3.2 },
  { day: "Kamis", hours: 2.0 },
  { day: "Jumat", hours: 1.5 },
  { day: "Sabtu", hours: 4.0 },
  { day: "Minggu", hours: 2.7 },
]

const courseProgressData = [
  {
    id: 1,
    title: "Dasar-Dasar Kelistrikan",
    progress: 100,
    status: "completed",
    lastAccessed: "3 hari yang lalu",
  },
  {
    id: 2,
    title: "Rangkaian Listrik Dasar",
    progress: 100,
    status: "completed",
    lastAccessed: "1 minggu yang lalu",
  },
  {
    id: 3,
    title: "Keselamatan Kerja di Bidang Kelistrikan",
    progress: 100,
    status: "completed",
    lastAccessed: "2 minggu yang lalu",
  },
  {
    id: 4,
    title: "Pengukuran Listrik",
    progress: 65,
    status: "in-progress",
    lastAccessed: "Kemarin",
  },
  {
    id: 5,
    title: "Pengenalan Energi Terbarukan",
    progress: 100,
    status: "completed",
    lastAccessed: "5 hari yang lalu",
  },
  {
    id: 6,
    title: "Dasar Teknologi Panel Surya",
    progress: 100,
    status: "completed",
    lastAccessed: "4 hari yang lalu",
  },
  {
    id: 7,
    title: "Sistem Turbin Angin",
    progress: 45,
    status: "in-progress",
    lastAccessed: "Hari ini",
  },
  {
    id: 8,
    title: "Pengantar Keselamatan Pertambangan",
    progress: 25,
    status: "in-progress",
    lastAccessed: "2 hari yang lalu",
  },
]

const skillProgressData = [
  { name: "Dasar Kelistrikan", progress: 85 },
  { name: "Rangkaian Listrik", progress: 60 },
  { name: "Keselamatan Kerja", progress: 100 },
  { name: "Energi Surya", progress: 40 },
  { name: "Energi Angin", progress: 25 },
]

const timeDistributionData = [
  { category: "Kursus Video", percentage: 45 },
  { category: "Latihan Praktik", percentage: 25 },
  { category: "Membaca Materi", percentage: 15 },
  { category: "Diskusi Forum", percentage: 10 },
  { category: "Ujian & Kuis", percentage: 5 },
]

const learningGoalsData = [
  {
    id: 1,
    title: "Menyelesaikan Jalur Teknisi Kelistrikan",
    target: "31 Agustus 2023",
    progress: 65,
  },
  {
    id: 2,
    title: "Mendapatkan Sertifikat Keselamatan Kerja Lanjutan",
    target: "15 September 2023",
    progress: 30,
  },
  {
    id: 3,
    title: "Menguasai 5 Keterampilan Energi Terbarukan",
    target: "30 Oktober 2023",
    progress: 40,
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analitik Pembelajaran</h1>
          <p className="text-muted-foreground mt-1">Pantau kemajuan belajar dan capaian Anda secara detail</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger value="week">Minggu Ini</TabsTrigger>
              <TabsTrigger value="month">Bulan Ini</TabsTrigger>
              <TabsTrigger value="year">Tahun Ini</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Jam Belajar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42.5</div>
            <p className="text-xs text-muted-foreground mt-1">+12% dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kursus Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">+3 dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sertifikat Diperoleh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">+1 dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peringkat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Naik 7 peringkat</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Belajar</CardTitle>
            <CardDescription>Jam belajar harian selama 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-10 w-10 mb-2" />
                <p>Grafik Aktivitas Belajar</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Topik</CardTitle>
            <CardDescription>Waktu belajar berdasarkan topik</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <PieChart className="h-10 w-10 mb-2" />
                <p>Grafik Distribusi Topik</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kemajuan Keterampilan</CardTitle>
            <CardDescription>Perkembangan level keterampilan</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart className="h-10 w-10 mb-2" />
                <p>Grafik Kemajuan Keterampilan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pencapaian Target</CardTitle>
            <CardDescription>Progres terhadap target pembelajaran</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Kursus Konstruksi</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Kursus Ketenagalistrikan</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Kursus Pertambangan</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Kursus Energi Terbarukan</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper function to get color for pie chart segments
function getColorForIndex(index: number) {
  const colors = [
    "rgba(59, 130, 246, 0.7)", // blue
    "rgba(16, 185, 129, 0.7)", // green
    "rgba(245, 158, 11, 0.7)", // amber
    "rgba(139, 92, 246, 0.7)", // purple
    "rgba(236, 72, 153, 0.7)", // pink
  ]
  return colors[index % colors.length]
}
