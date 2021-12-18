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

export type QuestionRoute = 'daily' | 'weekly' | 'monthly'

export type TypeOfDate = 'day' | 'week' | 'month'

export const questionTypes: QuestionRoute[] = ['daily', 'weekly', 'monthly']
