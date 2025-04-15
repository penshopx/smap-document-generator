import { getCourseById } from "@/actions/courses"
import { getUserProfile } from "@/actions/profile"
import { redirect, notFound } from "next/navigation"
import { CourseEditForm } from "@/components/instructor/course-edit-form"

export default async function EditCoursePage({ params }: { params: { courseId: string } }) {
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
      <div>
        <h1 className="text-3xl font-bold">Edit Kursus</h1>
        <p className="text-muted-foreground">Perbarui informasi kursus Anda</p>
      </div>

      <CourseEditForm course={course} />
    </div>
  )
}
