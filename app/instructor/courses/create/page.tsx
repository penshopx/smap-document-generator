import { CourseForm } from "@/components/instructor/course-form"
import { getUserProfile } from "@/actions/profile"
import { redirect } from "next/navigation"

export default async function CreateCoursePage() {
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
      <div>
        <h1 className="text-3xl font-bold">Buat Kursus Baru</h1>
        <p className="text-muted-foreground">
          Buat kursus baru dan mulai bagikan pengetahuan Anda dengan peserta didik.
        </p>
      </div>

      <CourseForm />
    </div>
  )
}
