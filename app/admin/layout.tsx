import type React from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return <div className="admin-layout">{children}</div>
}
