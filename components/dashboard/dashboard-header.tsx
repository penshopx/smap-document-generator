import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  profile: any
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang, {profile?.full_name || "Pengguna"}</h1>
        <p className="text-muted-foreground">
          Pantau kemajuan belajar dan temukan kursus baru untuk meningkatkan keterampilan Anda.
        </p>
      </div>
      <Button asChild>
        <Link href="/courses">
          <PlusCircle className="mr-2 h-4 w-4" />
          Jelajahi Kursus
        </Link>
      </Button>
    </div>
  )
}
