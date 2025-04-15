"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Clock, AlertTriangle } from "lucide-react"
import type { Assessment } from "@/lib/types/assessment"

export default function TakeAssessmentPage({ params }: { params: { courseId: string; assessmentId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { courseId, assessmentId } = params

  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [startTime] = useState<Date>(new Date())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`/api/assessments/${assessmentId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch assessment")
        }

        const { data } = await response.json()
        setAssessment(data)

        if (data.time_limit) {
          setTimeLeft(data.time_limit * 60) // Convert minutes to seconds
        }
      } catch (error) {
        console.error("Error fetching assessment:", error)
        toast({
          title: "Error",
          description: "Failed to load assessment",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [assessmentId, toast])

  useEffect(() => {
    if (timeLeft === null) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timeLeft])

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleNext = () => {
    if (!assessment?.questions) return
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    if (!assessment?.questions) return 0

    let totalPoints = 0
    let earnedPoints = 0
    const answersWithDetails = assessment.questions.map((question) => {
      const userAnswer = answers[question.id] || ""
      const isCorrect = userAnswer === question.correct_answer

      totalPoints += question.points
      if (isCorrect) {
        earnedPoints += question.points
      }

      return {
        question_id: question.id,
        user_answer: userAnswer,
        is_correct: isCorrect,
        points_earned: isCorrect ? question.points : 0,
      }
    })

    const score = Math.round((earnedPoints / totalPoints) * 100)
    const passed = score >= (assessment.passing_score || 0)

    return {
      score,
      passed,
      answers: answersWithDetails,
    }
  }

  const handleSubmit = async () => {
    if (!assessment) return

    try {
      setIsSubmitting(true)

      const endTime = new Date()
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000)

      const result = calculateScore()

      const response = await fetch("/api/user-assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessment_id: assessmentId,
          score: result.score,
          passed: result.passed,
          time_spent: timeSpent,
          started_at: startTime.toISOString(),
          answers: result.answers,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit assessment")
      }

      router.push(`/courses/${courseId}/assessments/${assessmentId}/results`)
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast({
        title: "Error",
        description: "Failed to submit assessment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading assessment...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-1">Assessment Not Found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            The assessment you're looking for doesn't exist or you don't have permission to access it.
          </p>
          <Button asChild>
            <a href={`/courses/${courseId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </a>
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = assessment.questions?.[currentQuestionIndex]
  const progress = assessment.questions ? ((currentQuestionIndex + 1) / assessment.questions.length) * 100 : 0
  const answeredQuestions = Object.keys(answers).length
  const totalQuestions = assessment.questions?.length || 0

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{assessment.title}</h1>
          <p className="text-muted-foreground">{assessment.description}</p>
        </div>
        {timeLeft !== null && (
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {assessment.questions?.length || 0}
          </span>
          <span>
            {answeredQuestions} of {totalQuestions} answered
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {currentQuestion && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
            <CardDescription>Points: {currentQuestion.points}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg">{currentQuestion.question_text}</div>

              {currentQuestion.question_type === "multiple_choice" && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.question_type === "true_false" && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="True" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="False" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.question_type === "short_answer" && (
                <div>
                  <Label htmlFor="short-answer">Your Answer</Label>
                  <Input
                    id="short-answer"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    placeholder="Type your answer here"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentQuestionIndex < (assessment.questions?.length || 0) - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {assessment.questions?.map((_, index) => (
            <Button
              key={index}
              variant={
                index === currentQuestionIndex
                  ? "default"
                  : answers[assessment.questions![index].id]
                    ? "outline"
                    : "ghost"
              }
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </div>
    </div>
  )
}
