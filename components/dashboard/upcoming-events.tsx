import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface UpcomingEventsProps {
  className?: string
}

export function UpcomingEvents({ className }: UpcomingEventsProps) {
  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: "Webinar: Kelistrikan Industri",
      date: "2023-08-15T14:00:00",
      duration: 60,
    },
    {
      id: 2,
      title: "Diskusi: Energi Terbarukan",
      date: "2023-08-18T10:00:00",
      duration: 90,
    },
    {
      id: 3,
      title: "Workshop: Keselamatan Kerja",
      date: "2023-08-20T09:00:00",
      duration: 120,
    },
  ]

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Acara Mendatang</CardTitle>
        <CardDescription>Jadwal acara dan webinar yang akan datang</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="font-medium">{event.title}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                <span>({event.duration} menit)</span>
              </div>
              <Button size="sm" className="mt-2">
                Daftar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
