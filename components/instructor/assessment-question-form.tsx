"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"

interface Question {
  id?: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "short_answer"
  options?: string[]
  correct_answer: string | string[]
  points: number
  order: number
}

interface AssessmentQuestionFormProps {
  question: Question
  onChange: (question: Question) => void
}

export function AssessmentQuestionForm({ question, onChange }: AssessmentQuestionFormProps) {
  const handleChange = (field: keyof Question, value: any) => {
    onChange({ ...question, [field]: value })
  }

  const handleOptionChange = (index: number, value: string) => {
    if (!question.options) return

    const newOptions = [...question.options]
    newOptions[index] = value
    onChange({ ...question, options: newOptions })
  }

  const addOption = () => {
    if (!question.options) {
      handleChange("options", [""])
      return
    }

    handleChange("options", [...question.options, ""])
  }

  const removeOption = (index: number) => {
    if (!question.options) return

    const newOptions = question.options.filter((_, i) => i !== index)
    onChange({ ...question, options: newOptions })

    // If the removed option was the correct answer, reset the correct answer
    if (question.correct_answer === question.options[index]) {
      onChange({ ...question, options: newOptions, correct_answer: "" })
    }
  }

  const handleQuestionTypeChange = (type: "multiple_choice" | "true_false" | "short_answer") => {
    const newQuestion = { ...question, question_type: type }

    if (type === "multiple_choice") {
      newQuestion.options = question.options?.length ? question.options : ["", "", "", ""]
      newQuestion.correct_answer = ""
    } else if (type === "true_false") {
      newQuestion.options = ["True", "False"]
      newQuestion.correct_answer = ""
    } else if (type === "short_answer") {
      newQuestion.options = undefined
      newQuestion.correct_answer = ""
    }

    onChange(newQuestion)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`question-text-${question.order}`}>Question Text</Label>
        <Textarea
          id={`question-text-${question.order}`}
          value={question.question_text}
          onChange={(e) => handleChange("question_text", e.target.value)}
          placeholder="Enter your question"
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`question-type-${question.order}`}>Question Type</Label>
          <Select value={question.question_type} onValueChange={(value: any) => handleQuestionTypeChange(value)}>
            <SelectTrigger id={`question-type-${question.order}`}>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
              <SelectItem value="true_false">True/False</SelectItem>
              <SelectItem value="short_answer">Short Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor={`question-points-${question.order}`}>Points</Label>
          <Input
            id={`question-points-${question.order}`}
            type="number"
            min="1"
            value={question.points}
            onChange={(e) => handleChange("points", Number.parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>

      {question.question_type === "multiple_choice" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Options</Label>
            <Button type="button" onClick={addOption} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          <RadioGroup
            value={question.correct_answer as string}
            onValueChange={(value) => handleChange("correct_answer", value)}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${question.order}-${index}`} />
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {question.options && question.options.length > 2 && (
                    <Button
                      type="button"
                      onClick={() => removeOption(index)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove option</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {question.question_type === "true_false" && (
        <div>
          <Label>Correct Answer</Label>
          <RadioGroup
            value={question.correct_answer as string}
            onValueChange={(value) => handleChange("correct_answer", value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="True" id={`true-${question.order}`} />
              <Label htmlFor={`true-${question.order}`}>True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="False" id={`false-${question.order}`} />
              <Label htmlFor={`false-${question.order}`}>False</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {question.question_type === "short_answer" && (
        <div>
          <Label htmlFor={`correct-answer-${question.order}`}>Correct Answer</Label>
          <Input
            id={`correct-answer-${question.order}`}
            value={question.correct_answer as string}
            onChange={(e) => handleChange("correct_answer", e.target.value)}
            placeholder="Enter the correct answer"
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Note: Student answers will be matched exactly with this text.
          </p>
        </div>
      )}
    </div>
  )
}
