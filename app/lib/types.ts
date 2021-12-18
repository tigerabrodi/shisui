import { QuestionAnswer, QuestionType } from '@prisma/client'

export type Styleable = {
  className?: string
}

export type Assessment = {
  createdAt: string
  id: string
  userId: string
  type: QuestionType
  questionsAnswers: QuestionAnswer[]
}
