import { Suspense } from "react"
import { redirect } from "next/navigation"
import { Users, BookOpen, GraduationCap, BarChart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlatformStatistics } from "@/lib/admin"
import { createServerSupabaseClient } from "@/lib/supabase"

// Loading component
function AdminDashboardLoading() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Stats card component
function StatsCard({ title, value, description, icon: Icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

// Admin dashboard stats component
async function AdminDashboardStats() {
  const { data, error } = await getPlatformStatistics()

  if (error) {
    return <div className="text-red-500">Error loading statistics: {error}</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Users" value={data.usersCount} description="Registered platform users" icon={Users} />
      <StatsCard title="Total Courses" value={data.coursesCount} description="Available courses" icon={BookOpen} />
      <StatsCard
        title="Total Enrollments"
        value={data.enrollmentsCount}
        description="Course enrollments"
        icon={GraduationCap}
      />
      <StatsCard
        title="Completion Rate"
        value={`${data.completionRate}%`}
        description={`${data.completedCount} completed enrollments`}
        icon={BarChart}
      />
    </div>
  )
}

// Main admin dashboard page
export default async function AdminDashboardPage() {
  // Check if user is admin
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Get user role from database
  const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Suspense fallback={<AdminDashboardLoading />}>
        <AdminDashboardStats />
      </Suspense>

      {/* Additional admin sections can be added here */}
    </div>
  )
}
