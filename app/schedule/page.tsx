import { Clock, MapPin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for schedule events
const events = [
  {
    id: 1,
    title: "Webinar: Inovasi dalam Energi Terbarukan",
    date: new Date(2023, 5, 15, 10, 0),
    endDate: new Date(2023, 5, 15, 12, 0),
    location: "Online (Zoom)",
    type: "webinar",
    instructor: "Dr. Rina Wijaya",
  },
  {
    id: 2,
    title: "Workshop Keselamatan Kerja di Pertambangan",
    date: new Date(2023, 5, 18, 9, 0),
    endDate: new Date(2023, 5, 18, 16, 0),
    location: "Gedung Diklat, Jakarta",
    type: "workshop",
    instructor: "Ir. Hadi Santoso",
  },
  {
    id: 3,
    title: "Ujian Sertifikasi Kelistrikan Tingkat Dasar",
    date: new Date(2023, 5, 20, 13, 0),
    endDate: new Date(2023, 5, 20, 15, 0),
    location: "Pusat Pengujian, Jakarta",
    type: "exam",
    instructor: null,
  },
  {
    id: 4,
    title: "Diskusi Panel: Masa Depan Konstruksi di Indonesia",
    date: new Date(2023, 5, 22, 14, 0),
    endDate: new Date(2023, 5, 22, 16, 30),
    location: "Online (Zoom)",
    type: "discussion",
    instructor: "Panel Ahli",
  },
  {
    id: 5,
    title: "Kelas Praktik: Instalasi Panel Surya",
    date: new Date(2023, 5, 25, 9, 0),
    endDate: new Date(2023, 5, 25, 17, 0),
    location: "Laboratorium Energi, Bandung",
    type: "practical",
    instructor: "Tim Instruktur",
  },
  {
    id: 6,
    title: "Seminar: Teknologi Terbaru dalam Pertambangan",
    date: new Date(2023, 5, 28, 10, 0),
    endDate: new Date(2023, 5, 28, 12, 0),
    location: "Auditorium Utama, Jakarta",
    type: "seminar",
    instructor: "Prof. Bambang Sutanto",
  },
]

// Helper function to format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

// Helper function to format time
const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Helper function to get event type badge variant
const getEventBadgeVariant = (type: string) => {
  switch (type) {
    case "webinar":
      return "default"
    case "workshop":
      return "secondary"
    case "exam":
      return "destructive"
    case "discussion":
      return "outline"
    case "practical":
      return "success"
    case "seminar":
      return "warning"
    default:
      return "outline"
  }
}

export default function SchedulePage() {
  const today = new Date()
  const upcomingEvents = events.filter((event) => event.date > today)
  const pastEvents = events.filter((event) => event.date <= today)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Jadwal Pembelajaran</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Akan Datang</TabsTrigger>
              <TabsTrigger value="past">Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={getEventBadgeVariant(event.type)}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{formatDate(event.date)}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              {event.instructor && (
                                <div className="text-sm text-muted-foreground">Instruktur: {event.instructor}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">Tambah ke Kalender</Button>
                            <Button>Daftar</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada jadwal yang akan datang</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="space-y-4">
                {pastEvents.length > 0 ? (
                  pastEvents.map((event) => (
                    <Card key={event.id} className="opacity-70">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{formatDate(event.date)}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              {event.instructor && (
                                <div className="text-sm text-muted-foreground">Instruktur: {event.instructor}</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Lihat Rekaman</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada jadwal yang telah selesai</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Kalender</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
              <div className="mt-6">
                <h3 className="font-medium mb-2">Legenda</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Webinar</Badge>
                    <span className="text-sm text-muted-foreground">Sesi pembelajaran online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Workshop</Badge>
                    <span className="text-sm text-muted-foreground">Sesi praktik intensif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Ujian</Badge>
                    <span className="text-sm text-muted-foreground">Sesi pengujian dan sertifikasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Diskusi</Badge>
                    <span className="text-sm text-muted-foreground">Forum diskusi interaktif</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/schedule/my">Lihat Jadwal Saya</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
