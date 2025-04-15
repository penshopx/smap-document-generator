import { createServerSupabaseClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get module details to check ownership
    const { data: module } = await supabase.from("modules").select("course_id").eq("id", params.id).single()

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    // Check if user is the instructor of the course
    const { data: course } = await supabase.from("courses").select("instructor_id").eq("id", module.course_id).single()

    if (!course || course.instructor_id !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Delete module
    const { error } = await supabase.from("modules").delete().eq("id", params.id)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting module:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
