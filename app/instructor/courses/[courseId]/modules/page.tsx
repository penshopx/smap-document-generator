import { getCourseById } from "@/actions/courses"
import { getUserProfile } from "@/actions/profile"
import { redirect, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ModulesList } from "@/components/instructor/modules-list"

export default async function CourseModulesPage({ params }: { params: { courseId: string } }) {
  // Get user profile to check if they're an instructor
  const { data: profile, error: profileError } = await getUserProfile()

  if (profileError) {
    redirect("/auth/login")
  }

  // Check if user is an instructor
  if (!profile.is_instructor) {
    redirect("/dashboard")
  }

  // Get course details
  const { data: course, error: courseError } = await getCourseById(params.courseId)

  if (courseError || !course) {
    notFound()
  }

  // Check if user is the instructor of this course
  if (course.instructor_id !== profile.id) {
    redirect("/instructor/courses")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modul Kursus</h1>
          <p className="text-muted-foreground">Kelola modul untuk kursus: {course.title}</p>
        </div>
        <Button asChild>
          <Link href={`/instructor/courses/${params.courseId}/modules/create`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Modul
          </Link>
        </Button>
      </div>

      <ModulesList courseId={params.courseId} modules={course.modules || []} />
    </div>
  )
}
