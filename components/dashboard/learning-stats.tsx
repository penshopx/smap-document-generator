import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Clock, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface LearningStatsProps {
  enrollments: any[]
  className?: string
}

export function LearningStats({ enrollments, className }: LearningStatsProps) {
  // Calculate stats
  const totalCourses = enrollments.length
  const completedCourses = enrollments.filter((e) => e.completed).length
  const totalMinutes = enrollments.reduce((acc, curr) => acc + (curr.courses?.duration || 0), 0)
  const averageProgress = enrollments.length
    ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progress, 0) / enrollments.length)
    : 0

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Statistik Pembelajaran</CardTitle>
        <CardDescription>Ringkasan aktivitas pembelajaran Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">Kursus Terdaftar</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <Award className="h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">Kursus Selesai</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <Clock className="h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{totalMinutes}</div>
            <p className="text-xs text-muted-foreground">Menit Belajar</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <Target className="h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Rata-rata Progres</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
