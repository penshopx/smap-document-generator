import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, MessageSquare } from "lucide-react"

export function RecentActivity() {
  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      type: "course_progress",
      title: "Menyelesaikan modul Dasar Kelistrikan",
      timestamp: "2023-08-10T15:30:00",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "certificate",
      title: "Mendapatkan sertifikat Keselamatan Kerja",
      timestamp: "2023-08-08T09:15:00",
      icon: <Award className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "discussion",
      title: "Mengomentari diskusi Energi Terbarukan",
      timestamp: "2023-08-05T14:20:00",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
        <CardDescription>Aktivitas pembelajaran Anda dalam 7 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-primary/10 p-2">{activity.icon}</div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
