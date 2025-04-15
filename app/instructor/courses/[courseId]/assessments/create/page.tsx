"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Save } from "lucide-react"
import Link from "next/link"
import { AssessmentQuestionForm } from "@/components/instructor/assessment-question-form"

interface Question {
  id?: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "short_answer"
  options?: string[]
  correct_answer: string | string[]
  points: number
  order: number
}

export default function CreateAssessmentPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const courseId = params.courseId

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assessment, setAssessment] = useState({
    title: "",
    description: "",
    time_limit: 30,
    passing_score: 70,
    attempts_allowed: 3,
    is_published: false,
  })

  const [questions, setQuestions] = useState<Question[]>([])

  const handleAssessmentChange = (field: string, value: any) => {
    setAssessment((prev) => ({ ...prev, [field]: value }))
  }

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question_text: "",
        question_type: "multiple_choice",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 10,
        order: prev.length,
      },
    ])
  }

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...questions]
    newQuestions[index] = question
    setQuestions(newQuestions)
  }

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!assessment.title || !assessment.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one question",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Create assessment
      const assessmentResponse = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: courseId,
          ...assessment,
        }),
      })

      if (!assessmentResponse.ok) {
        throw new Error("Failed to create assessment")
      }

      const { data: newAssessment } = await assessmentResponse.json()

      // Create questions
      for (const question of questions) {
        const questionResponse = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assessment_id: newAssessment[0].id,
            ...question,
          }),
        })

        if (!questionResponse.ok) {
          throw new Error("Failed to create question")
        }
      }

      toast({
        title: "Success",
        description: "Assessment created successfully",
      })

      router.push(`/instructor/courses/${courseId}/assessments`)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create assessment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/instructor/courses/${courseId}/assessments`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assessments
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Create New Assessment</h1>
          <p className="text-muted-foreground">Add a new assessment to your course</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>Basic information about the assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={assessment.title}
                    onChange={(e) => handleAssessmentChange("title", e.target.value)}
                    placeholder="Enter assessment title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={assessment.description}
                    onChange={(e) => handleAssessmentChange("description", e.target.value)}
                    placeholder="Enter assessment description"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Settings</CardTitle>
              <CardDescription>Configure assessment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time_limit">Time Limit (minutes)</Label>
                  <Input
                    id="time_limit"
                    type="number"
                    min="1"
                    value={assessment.time_limit}
                    onChange={(e) => handleAssessmentChange("time_limit", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="passing_score">Passing Score (%)</Label>
                  <Input
                    id="passing_score"
                    type="number"
                    min="0"
                    max="100"
                    value={assessment.passing_score}
                    onChange={(e) => handleAssessmentChange("passing_score", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="attempts_allowed">Attempts Allowed</Label>
                  <Input
                    id="attempts_allowed"
                    type="number"
                    min="1"
                    value={assessment.attempts_allowed}
                    onChange={(e) => handleAssessmentChange("attempts_allowed", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="is_published"
                    checked={assessment.is_published}
                    onCheckedChange={(checked) => handleAssessmentChange("is_published", checked)}
                  />
                  <Label htmlFor="is_published">Publish Assessment</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Add questions to your assessment</CardDescription>
              </div>
              <Button type="button" onClick={addQuestion} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No questions added yet</p>
                  <Button type="button" onClick={addQuestion} variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Question
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-6" />}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Question {index + 1}</h3>
                        <Button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                      <AssessmentQuestionForm
                        question={question}
                        onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/instructor/courses/${courseId}/assessments`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Assessment"}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
