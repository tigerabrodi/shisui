import { Question, QuestionType } from '@prisma/client'
import { QuestionRoute, questionTypes } from './types'

/* 111 % 10 will return 11, hence `modularOfDoubleNumbers` will be 1, but 11 has a suffix of `th`, hence the variable `modularOfTripleNumbers` is necessary to ensure it works at least between 0 - 1000 */
export const ordinalSuffix = (index: number) => {
  const modularOfTen = index % 10
  const modularOfHundred = index % 100
  if (modularOfTen == 1 && modularOfHundred != 11) {
    return index + 'st'
  }
  if (modularOfTen == 2 && modularOfHundred != 12) {
    return index + 'nd'
  }
  if (modularOfTen == 3 && modularOfHundred != 13) {
    return index + 'rd'
  }
  return index + 'th'
}

type TransformToQuestion = {
  title: string
  type: QuestionType
  userId: string
}

export const transformToQuestion = ({
  title,
  type,
  userId,
}: TransformToQuestion) =>
  ({
    title,
    type,
    userId,
  } as Question)

export const convertToDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export const toQuestionAnswer = (question: Question, form: FormData) => ({
  question: question.title,
  answer: form.get(question.title) as string,
})

export const doesAnyTypeExistInParams = (type: QuestionRoute) =>
  !questionTypes.includes(type)
