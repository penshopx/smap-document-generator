import { getUserEnrollments } from "@/actions/enrollments"
import { getUserProfile } from "@/actions/profile"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EnrolledCourses } from "@/components/dashboard/enrolled-courses"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { LearningStats } from "@/components/dashboard/learning-stats"
import { RecommendedCourses } from "@/components/dashboard/recommended-courses"

export default async function DashboardPage() {
  // Get user profile
  const { data: profile, error: profileError } = await getUserProfile()

  if (profileError) {
    redirect("/auth/login")
  }

  // Get user enrollments
  const { data: enrollments, error: enrollmentsError } = await getUserEnrollments()

  return (
    <div className="space-y-8">
      <DashboardHeader profile={profile} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LearningStats enrollments={enrollments || []} className="lg:col-span-2" />
        <UpcomingEvents className="lg:row-span-2" />
        <EnrolledCourses enrollments={enrollments || []} className="lg:col-span-2" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentActivity />
        <RecommendedCourses />
      </div>
    </div>
  )
}
