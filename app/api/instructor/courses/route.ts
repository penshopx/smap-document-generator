import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get courses created by the instructor
    const { data, error } = await supabase
      .from("courses")
      .select("*, enrollments(count)")
      .eq("instructor_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // Process data to include student count
    const processedData = data.map((course) => ({
      ...course,
      student_count: course.enrollments?.[0]?.count || 0,
      enrollments: undefined,
    }))

    return NextResponse.json(processedData)
  } catch (error: any) {
    console.error("Error fetching instructor courses:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
