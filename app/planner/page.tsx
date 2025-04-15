"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus, Users, Check } from "lucide-react"
import { addDays, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns"
import { id } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Webinar: Inovasi dalam Energi Terbarukan",
    date: new Date(2023, 5, 15, 10, 0),
    endDate: new Date(2023, 5, 15, 12, 0),
    location: "Online (Zoom)",
    type: "webinar",
    instructor: "Dr. Rina Wijaya",
    description: "Webinar tentang inovasi terbaru dalam bidang energi terbarukan dan implementasinya di Indonesia.",
    participants: 45,
    isRegistered: true,
  },
  {
    id: 2,
    title: "Workshop Keselamatan Kerja di Pertambangan",
    date: new Date(2023, 5, 18, 9, 0),
    endDate: new Date(2023, 5, 18, 16, 0),
    location: "Gedung Diklat, Jakarta",
    type: "workshop",
    instructor: "Ir. Hadi Santoso",
    description: "Workshop intensif tentang protokol keselamatan kerja di lingkungan pertambangan.",
    participants: 28,
    isRegistered: true,
  },
  {
    id: 3,
    title: "Ujian Sertifikasi Kelistrikan Tingkat Dasar",
    date: new Date(2023, 5, 20, 13, 0),
    endDate: new Date(2023, 5, 20, 15, 0),
    location: "Pusat Pengujian, Jakarta",
    type: "exam",
    instructor: null,
    description: "Ujian sertifikasi untuk keahlian dasar kelistrikan.",
    participants: 32,
    isRegistered: true,
  },
  {
    id: 4,
    title: "Diskusi Panel: Masa Depan Konstruksi di Indonesia",
    date: new Date(2023, 5, 22, 14, 0),
    endDate: new Date(2023, 5, 22, 16, 30),
    location: "Online (Zoom)",
    type: "discussion",
    instructor: "Panel Ahli",
    description: "Diskusi panel dengan para ahli tentang tren dan masa depan industri konstruksi di Indonesia.",
    participants: 60,
    isRegistered: false,
  },
  {
    id: 5,
    title: "Kelas Praktik: Instalasi Panel Surya",
    date: new Date(2023, 5, 25, 9, 0),
    endDate: new Date(2023, 5, 25, 17, 0),
    location: "Laboratorium Energi, Bandung",
    type: "practical",
    instructor: "Tim Instruktur",
    description: "Kelas praktik langsung tentang instalasi dan pemeliharaan panel surya.",
    participants: 20,
    isRegistered: false,
  },
  {
    id: 6,
    title: "Seminar: Teknologi Terbaru dalam Pertambangan",
    date: new Date(2023, 5, 28, 10, 0),
    endDate: new Date(2023, 5, 28, 12, 0),
    location: "Auditorium Utama, Jakarta",
    type: "seminar",
    instructor: "Prof. Bambang Sutanto",
    description: "Seminar tentang teknologi dan inovasi terbaru dalam industri pertambangan.",
    participants: 75,
    isRegistered: false,
  },
]

// Mock data for tasks
const tasks = [
  {
    id: 1,
    title: "Menyelesaikan modul 3 kursus Dasar-Dasar Kelistrikan",
    dueDate: new Date(2023, 5, 16),
    priority: "high",
    completed: false,
    course: "Dasar-Dasar Kelistrikan",
  },
  {
    id: 2,
    title: "Mengerjakan tugas analisis rangkaian listrik",
    dueDate: new Date(2023, 5, 17),
    priority: "medium",
    completed: false,
    course: "Dasar-Dasar Kelistrikan",
  },
  {
    id: 3,
    title: "Membaca materi persiapan ujian sertifikasi",
    dueDate: new Date(2023, 5, 19),
    priority: "high",
    completed: false,
    course: "Dasar-Dasar Kelistrikan",
  },
  {
    id: 4,
    title: "Menonton video tutorial keselamatan kerja",
    dueDate: new Date(2023, 5, 17),
    priority: "low",
    completed: true,
    course: "Keselamatan Kerja di Pertambangan",
  },
  {
    id: 5,
    title: "Mengerjakan kuis tentang energi terbarukan",
    dueDate: new Date(2023, 5, 21),
    priority: "medium",
    completed: false,
    course: "Pengenalan Energi Terbarukan",
  },
  {
    id: 6,
    title: "Menyiapkan presentasi untuk diskusi panel",
    dueDate: new Date(2023, 5, 21),
    priority: "high",
    completed: false,
    course: "Teknik Konstruksi Modern",
  },
]

// Helper function to format date
const formatDate = (date: Date) => {
  return format(date, "d MMMM yyyy", { locale: id })
}

// Helper function to format time
const formatTime = (date: Date) => {
  return format(date, "HH:mm", { locale: id })
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

// Helper function to get priority badge variant
const getPriorityBadgeVariant = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "warning"
    case "low":
      return "outline"
    default:
      return "outline"
  }
}

// Helper function to get priority label
const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "high":
      return "Tinggi"
    case "medium":
      return "Sedang"
    case "low":
      return "Rendah"
    default:
      return "Tidak Diketahui"
  }
}

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    priority: "medium",
    course: "",
  })

  // Get events for selected date
  const eventsForSelectedDate = events.filter((event) => isSameDay(event.date, selectedDate))

  // Get tasks for selected date
  const tasksForSelectedDate = tasks.filter((task) => isSameDay(task.dueDate, selectedDate))

  // Get upcoming tasks (not completed and due in the future)
  const upcomingTasks = tasks
    .filter((task) => !task.completed && task.dueDate >= new Date())
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  // Get overdue tasks (not completed and due in the past)
  const overdueTasks = tasks
    .filter((task) => !task.completed && task.dueDate < new Date())
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  // Get completed tasks
  const completedTasks = tasks.filter((task) => task.completed)

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Handle task submission
  const handleSubmitTask = () => {
    // In a real app, this would add the task to the database
    console.log("Adding task:", newTask)
    setShowAddTask(false)
    // Reset form
    setNewTask({
      title: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      priority: "medium",
      course: "",
    })
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate)
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Week starts on Monday
    const days = []
    let day = weekStart

    // Generate 42 days (6 weeks) to ensure we have enough days for the calendar
    for (let i = 0; i < 42; i++) {
      const eventsOnDay = events.filter((event) => isSameDay(event.date, day))
      const tasksOnDay = tasks.filter((task) => isSameDay(task.dueDate, day))

      days.push({
        date: day,
        isCurrentMonth: isSameMonth(day, currentDate),
        events: eventsOnDay,
        tasks: tasksOnDay,
      })

      day = addDays(day, 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Planner</h1>
          <p className="text-muted-foreground">Kelola jadwal, tugas, dan kegiatan pembelajaran Anda</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Tugas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Tugas Baru</DialogTitle>
                <DialogDescription>Buat tugas baru untuk melacak aktivitas pembelajaran Anda.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Tugas</Label>
                  <Input
                    id="title"
                    placeholder="Masukkan judul tugas"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Tenggat Waktu</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Kursus Terkait</Label>
                  <Select value={newTask.course} onValueChange={(value) => setNewTask({ ...newTask, course: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kursus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dasar-Dasar Kelistrikan">Dasar-Dasar Kelistrikan</SelectItem>
                      <SelectItem value="Keselamatan Kerja di Pertambangan">
                        Keselamatan Kerja di Pertambangan
                      </SelectItem>
                      <SelectItem value="Pengenalan Energi Terbarukan">Pengenalan Energi Terbarukan</SelectItem>
                      <SelectItem value="Teknik Konstruksi Modern">Teknik Konstruksi Modern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Batal
                </Button>
                <Button onClick={handleSubmitTask} disabled={!newTask.title}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="tasks">Tugas</TabsTrigger>
          <TabsTrigger value="events">Acara</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Bulan Sebelumnya</span>
                    </Button>
                    <h2 className="text-lg font-medium">{format(currentDate, "MMMM yyyy", { locale: id })}</h2>
                    <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Bulan Berikutnya</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Hari Ini</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium py-2">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`min-h-[80px] p-1 border rounded-md ${
                          day.isCurrentMonth ? "bg-card" : "bg-muted/50 text-muted-foreground"
                        } ${isSameDay(day.date, selectedDate) ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm font-medium ${
                              isSameDay(day.date, new Date())
                                ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                                : ""
                            }`}
                          >
                            {format(day.date, "d")}
                          </span>
                          {(day.events.length > 0 || day.tasks.length > 0) && (
                            <div className="flex gap-1">
                              {day.events.length > 0 && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                              {day.tasks.length > 0 && <div className="h-2 w-2 rounded-full bg-amber-500" />}
                            </div>
                          )}
                        </div>
                        <div className="mt-1 space-y-1">
                          {day.events.slice(0, 2).map((event, i) => (
                            <div
                              key={i}
                              className="text-xs truncate px-1 py-0.5 rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            >
                              {event.title}
                            </div>
                          ))}
                          {day.tasks.slice(0, 2).map((task, i) => (
                            <div
                              key={i}
                              className={`text-xs truncate px-1 py-0.5 rounded-sm ${
                                task.completed
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              }`}
                            >
                              {task.title}
                            </div>
                          ))}
                          {(day.events.length > 2 || day.tasks.length > 2) && (
                            <div className="text-xs text-muted-foreground px-1">
                              +{day.events.length + day.tasks.length - 4} lainnya
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{format(selectedDate, "EEEE, d MMMM yyyy", { locale: id })}</CardTitle>
                  <CardDescription>
                    {eventsForSelectedDate.length > 0 || tasksForSelectedDate.length > 0
                      ? `${eventsForSelectedDate.length} acara dan ${tasksForSelectedDate.length} tugas`
                      : "Tidak ada acara atau tugas"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {eventsForSelectedDate.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Acara</h3>
                      <div className="space-y-3">
                        {eventsForSelectedDate.map((event) => (
                          <div key={event.id} className="border rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={getEventBadgeVariant(event.type)}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                              {event.isRegistered && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Terdaftar
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-medium mb-2">{event.title}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              {event.instructor && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>Instruktur: {event.instructor}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tasksForSelectedDate.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Tugas</h3>
                      <div className="space-y-3">
                        {tasksForSelectedDate.map((task) => (
                          <div key={task.id} className="border rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                {getPriorityLabel(task.priority)}
                              </Badge>
                              {task.completed && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Selesai
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-medium mb-1">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">Kursus: {task.course}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {eventsForSelectedDate.length === 0 && tasksForSelectedDate.length === 0 && (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Tidak ada acara atau tugas untuk tanggal ini</p>
                      <Button variant="outline" className="mt-4" onClick={() => setShowAddTask(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Tugas
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tugas Saya</CardTitle>
                  <CardDescription>Kelola dan lacak tugas pembelajaran Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Akan Datang ({upcomingTasks.length})</TabsTrigger>
                      <TabsTrigger value="overdue">Terlambat ({overdueTasks.length})</TabsTrigger>
                      <TabsTrigger value="completed">Selesai ({completedTasks.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      {upcomingTasks.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingTasks.map((task) => (
                            <div key={task.id} className="flex items-start gap-3 border rounded-lg p-4">
                              <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 rounded-md border"
                                checked={task.completed}
                                readOnly
                              />
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{task.title}</h4>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span>Tenggat: {formatDate(task.dueDate)}</span>
                                  <span>•</span>
                                  <span>Kursus: {task.course}</span>
                                </div>
                              </div>
                              <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                {getPriorityLabel(task.priority)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">Tidak ada tugas yang akan datang</p>
                          <Button variant="outline" className="mt-4" onClick={() => setShowAddTask(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Tugas
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="overdue">
                      {overdueTasks.length > 0 ? (
                        <div className="space-y-4">
                          {overdueTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start gap-3 border rounded-lg p-4 bg-red-50 dark:bg-red-950/20"
                            >
                              <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 rounded-md border"
                                checked={task.completed}
                                readOnly
                              />
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{task.title}</h4>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span>Tenggat: {formatDate(task.dueDate)}</span>
                                  <span>•</span>
                                  <span>Kursus: {task.course}</span>
                                </div>
                              </div>
                              <Badge variant="destructive">Terlambat</Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">Tidak ada tugas yang terlambat</p>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="completed">
                      {completedTasks.length > 0 ? (
                        <div className="space-y-4">
                          {completedTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start gap-3 border rounded-lg p-4 bg-green-50 dark:bg-green-950/20"
                            >
                              <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 rounded-md border"
                                checked={task.completed}
                                readOnly
                              />
                              <div className="flex-1">
                                <h4 className="font-medium mb-1 line-through opacity-70">{task.title}</h4>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span>Tenggat: {formatDate(task.dueDate)}</span>
                                  <span>•</span>
                                  <span>Kursus: {task.course}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Selesai
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">Tidak ada tugas yang selesai</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Statistik Tugas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total Tugas</p>
                      <div className="text-2xl font-bold">{tasks.length}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tugas Selesai</p>
                      <div className="text-2xl font-bold">{completedTasks.length}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tugas Terlambat</p>
                      <div className="text-2xl font-bold">{overdueTasks.length}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tugas Berdasarkan Kursus</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[
                      "Dasar-Dasar Kelistrikan",
                      "Keselamatan Kerja di Pertambangan",
                      "Pengenalan Energi Terbarukan",
                      "Teknik Konstruksi Modern",
                    ].map((course) => {
                      const courseTasks = tasks.filter((task) => task.course === course)
                      const completedCourseTasks = courseTasks.filter((task) => task.completed)

                      return (
                        <div key={course} className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{course}</h4>
                            <span className="text-sm text-muted-foreground">
                              {completedCourseTasks.length}/{courseTasks.length} tugas
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width:
                                  courseTasks.length > 0
                                    ? `${(completedCourseTasks.length / courseTasks.length) * 100}%`
                                    : "0%",
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Acara Mendatang</CardTitle>
                  <CardDescription>Jadwal acara dan kegiatan pembelajaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {events.map((event) => (
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
                              <Button variant="outline">Detail</Button>
                              {event.isRegistered ? (
                                <Button variant="outline" className="text-green-600 border-green-600">
                                  Terdaftar
                                </Button>
                              ) : (
                                <Button>Daftar</Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Instruktur</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {["Dr. Rina Wijaya", "Ir. Hadi Santoso", "Prof. Bambang Sutanto"].map((instructor) => (
                      <div key={instructor} className="p-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{instructor}</p>
                          <p className="text-sm text-muted-foreground">
                            {events.filter((event) => event.instructor === instructor).length} acara
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Jenis Acara</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["webinar", "workshop", "exam", "discussion", "practical", "seminar"].map((type) => {
                      const typeEvents = events.filter((event) => event.type === type)
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={getEventBadgeVariant(type)}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Badge>
                            <span className="text-sm">{typeEvents.length} acara</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Lihat
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
