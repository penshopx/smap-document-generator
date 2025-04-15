"use client"

import { useState } from "react"
import { Calendar, CheckCircle2, Clock, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseProgress {
  id: number
  title: string
  progress: number
  totalModules: number
  completedModules: number
  totalHours: number
  completedHours: number
  lastAccessed: string
}

interface StudyGoal {
  id: number
  title: string
  target: number
  current: number
  unit: string
  deadline: string
  type: "daily" | "weekly" | "monthly"
}

interface StudyProgressTrackerProps {
  courses?: CourseProgress[]
  goals?: StudyGoal[]
}

export function StudyProgressTracker({
  courses = [
    {
      id: 1,
      title: "Dasar-Dasar Kelistrikan",
      progress: 75,
      totalModules: 8,
      completedModules: 6,
      totalHours: 4,
      completedHours: 3,
      lastAccessed: "2 hari yang lalu",
    },
    {
      id: 2,
      title: "Keselamatan Kerja di Pertambangan",
      progress: 40,
      totalModules: 10,
      completedModules: 4,
      totalHours: 6,
      completedHours: 2.5,
      lastAccessed: "1 minggu yang lalu",
    },
    {
      id: 3,
      title: "Pengenalan Energi Terbarukan",
      progress: 25,
      totalModules: 12,
      completedModules: 3,
      totalHours: 3,
      completedHours: 0.75,
      lastAccessed: "2 minggu yang lalu",
    },
  ],
  goals = [
    {
      id: 1,
      title: "Jam Belajar",
      target: 10,
      current: 6,
      unit: "jam",
      deadline: "Minggu ini",
      type: "weekly",
    },
    {
      id: 2,
      title: "Modul Selesai",
      target: 5,
      current: 3,
      unit: "modul",
      deadline: "Minggu ini",
      type: "weekly",
    },
    {
      id: 3,
      title: "Kursus Selesai",
      target: 2,
      current: 0,
      unit: "kursus",
      deadline: "Bulan ini",
      type: "monthly",
    },
  ],
}: StudyProgressTrackerProps) {
  const [activeTab, setActiveTab] = useState("courses")

  // Calculate overall progress
  const totalProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length

  // Calculate total study hours
  const totalStudyHours = courses.reduce((acc, course) => acc + course.completedHours, 0)

  // Calculate total completed modules
  const totalCompletedModules = courses.reduce((acc, course) => acc + course.completedModules, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progres Pembelajaran</CardTitle>
        <CardDescription>Pantau kemajuan pembelajaran dan capai target Anda</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="courses" className="flex-1">
                Kursus
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex-1">
                Target
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">
                Statistik
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="courses" className="m-0">
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Progres Keseluruhan</p>
                  <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Urutkan
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>
              <Progress value={totalProgress} className="h-2 mb-6" />

              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{course.title}</h3>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>
                          {course.completedModules}/{course.totalModules} modul
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {course.completedHours}/{course.totalHours} jam
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{course.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="m-0">
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-medium">Target Aktif</p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
                <Button size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Tambah Target
                </Button>
              </div>

              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {goal.current}/{goal.target} {goal.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((goal.current / goal.target) * 100)}%
                        </p>
                      </div>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="m-0">
            <div className="px-6 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm font-medium">Total Jam Belajar</p>
                      <p className="text-2xl font-bold">{totalStudyHours}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm font-medium">Modul Selesai</p>
                      <p className="text-2xl font-bold">{totalCompletedModules}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <Calendar className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm font-medium">Streak Belajar</p>
                      <p className="text-2xl font-bold">7 hari</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Distribusi Waktu Belajar</h3>
                <div className="h-40 flex items-end gap-2">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, i) => {
                    // Generate random height for the bar (in a real app, this would be actual data)
                    const height = Math.floor(Math.random() * 80) + 20
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-primary/80 rounded-t-md" style={{ height: `${height}%` }} />
                        <span className="text-xs">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>
        <Button variant="outline" size="sm">
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}
