"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Clock, Edit, FileText, Plus, Trash2, Users } from "lucide-react"
import type { Assessment } from "@/lib/types/assessment"

export default function AssessmentsPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const courseId = params.courseId

  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`/api/assessments?courseId=${courseId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch assessments")
        }

        const { data } = await response.json()
        setAssessments(data)
      } catch (error) {
        console.error("Error fetching assessments:", error)
        toast({
          title: "Error",
          description: "Failed to load assessments",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [courseId, toast])

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/assessments/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete assessment")
      }

      setAssessments((prev) => prev.filter((assessment) => assessment.id !== deleteId))

      toast({
        title: "Success",
        description: "Assessment deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting assessment:", error)
      toast({
        title: "Error",
        description: "Failed to delete assessment",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/instructor/courses/${courseId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">Manage assessments for your course</p>
        </div>
        <Button asChild>
          <Link href={`/instructor/courses/${courseId}/assessments/create`}>
            <Plus className="mr-2 h-4 w-4" />
            Create Assessment
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50"></CardHeader>
              <CardContent className="h-32 bg-muted/30"></CardContent>
            </Card>
          ))}
        </div>
      ) : assessments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No Assessments Yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You haven't created any assessments for this course yet. Create your first assessment to test your
              students' knowledge.
            </p>
            <Button asChild>
              <Link href={`/instructor/courses/${courseId}/assessments/create`}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Assessment
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-2">{assessment.title}</CardTitle>
                  <Badge variant={assessment.is_published ? "default" : "outline"}>
                    {assessment.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{assessment.time_limit || "No"} min limit</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{assessment.attempts_allowed} attempts</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Passing score: {assessment.passing_score}%</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(assessment.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/instructor/courses/${courseId}/assessments/${assessment.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the assessment and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
