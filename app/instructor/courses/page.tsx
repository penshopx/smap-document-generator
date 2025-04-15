import { getUserProfile } from "@/actions/profile"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { InstructorCoursesList } from "@/components/instructor/instructor-courses-list"

export default async function InstructorCoursesPage() {
  // Get user profile to check if they're an instructor
  const { data: profile, error } = await getUserProfile()

  if (error) {
    redirect("/auth/login")
  }

  // Check if user is an instructor
  if (!profile.is_instructor) {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kursus Saya</h1>
          <p className="text-muted-foreground">Kelola kursus yang Anda buat</p>
        </div>
        <Button asChild>
          <Link href="/instructor/courses/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Buat Kursus
          </Link>
        </Button>
      </div>

      <InstructorCoursesList />
    </div>
  )
}
