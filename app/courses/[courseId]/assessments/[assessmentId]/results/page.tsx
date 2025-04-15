"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"
import type { Assessment } from "@/lib/types/assessment"

interface UserAssessment {
  id: string
  user_id: string
  assessment_id: string
  score: number
  passed: boolean
  time_spent: number
  started_at: string
  completed_at: string
  answers: {
    question_id: string
    user_answer: string
    is_correct: boolean
    points_earned: number
  }[]
}

export default function AssessmentResultsPage({ params }: { params: { courseId: string; assessmentId: string } }) {
  const { toast } = useToast()
  const { courseId, assessmentId } = params

  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [userAssessment, setUserAssessment] = useState<UserAssessment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assessment
        const assessmentResponse = await fetch(`/api/assessments/${assessmentId}`)

        if (!assessmentResponse.ok) {
          throw new Error("Failed to fetch assessment")
        }

        const { data: assessmentData } = await assessmentResponse.json()
        setAssessment(assessmentData)

        // Fetch user's assessment results
        const userAssessmentResponse = await fetch(`/api/user-assessments?assessmentId=${assessmentId}`)

        if (!userAssessmentResponse.ok) {
          throw new Error("Failed to fetch assessment results")
        }

        const { data: userAssessmentData } = await userAssessmentResponse.json()

        if (userAssessmentData && userAssessmentData.length > 0) {
          // Get the most recent attempt
          const sortedAttempts = userAssessmentData.sort(
            (a: UserAssessment, b: UserAssessment) =>
              new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
          )

          setUserAssessment(sortedAttempts[0])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load assessment results",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [assessmentId, toast])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes < 1) {
      return `${seconds} seconds`
    }

    return `${minutes} min ${remainingSeconds} sec`
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!assessment || !userAssessment) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <h3 className="text-lg font-medium mb-1">Results Not Found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            We couldn't find the assessment results you're looking for.
          </p>
          <Button asChild>
            <Link href={`/courses/${courseId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href={`/courses/${courseId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{assessment.title} - Results</h1>
        <p className="text-muted-foreground">{assessment.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{userAssessment.score}%</div>
            <Progress value={userAssessment.score} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">Passing score: {assessment.passing_score}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            {userAssessment.passed ? (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">Passed</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <XCircle className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">Failed</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {userAssessment.passed
                ? "Congratulations! You've passed this assessment."
                : "You didn't meet the passing score. You can try again."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              <span className="text-2xl font-bold">{formatTime(userAssessment.time_spent)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {assessment.time_limit ? `Time limit: ${formatTime(assessment.time_limit * 60)}` : "No time limit"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userAssessment.answers.map((answer, index) => {
              const question = assessment.questions.find((q) => q.id === answer.question_id)
              if (!question) return null

              return (
                <div key={answer.question_id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium">
                      Question {index + 1}: {question.text}
                    </h3>
                    <div className={`flex items-center ${answer.is_correct ? "text-green-500" : "text-red-500"}`}>
                      {answer.is_correct ? (
                        <CheckCircle className="h-5 w-5 mr-1" />
                      ) : (
                        <XCircle className="h-5 w-5 mr-1" />
                      )}
                      <span>
                        {answer.points_earned} / {question.points} points
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Your answer:</p>
                      <p
                        className={`p-2 rounded ${answer.is_correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                      >
                        {answer.user_answer}
                      </p>
                    </div>

                    {!answer.is_correct && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Correct answer:</p>
                        <p className="p-2 rounded bg-green-50 text-green-700">{question.correct_answer}</p>
                      </div>
                    )}
                  </div>

                  {question.explanation && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Explanation:</p>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button asChild>
          <Link href={`/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>

        {!userAssessment.passed && (
          <Button asChild variant="default">
            <Link href={`/courses/${courseId}/assessments/${assessmentId}`}>Try Again</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
