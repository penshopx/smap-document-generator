export interface Question {
  id: string
  assessment_id: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "short_answer"
  options?: string[]
  correct_answer: string | string[]
  points: number
  order: number
  created_at: string
  updated_at: string
}

export interface Assessment {
  id: string
  course_id: string
  module_id?: string
  title: string
  description: string
  time_limit?: number // in minutes
  passing_score: number
  attempts_allowed: number
  is_published: boolean
  created_at: string
  updated_at: string
  questions?: Question[]
}

export interface UserAssessment {
  id: string
  user_id: string
  assessment_id: string
  score: number
  passed: boolean
  time_spent: number // in seconds
  started_at: string
  completed_at?: string
  answers: {
    question_id: string
    user_answer: string | string[]
    is_correct: boolean
    points_earned: number
  }[]
}
