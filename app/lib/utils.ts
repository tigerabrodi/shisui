import { Question, QuestionType } from '@prisma/client'
import { QuestionRoute, questionTypes } from './types'

const pluralRule = new Intl.PluralRules('en-US', {
  type: 'ordinal',
})

const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
])

export const formatOrdinals = (number: number) => {
  const rule = pluralRule.select(number)
  const suffix = suffixes.get(rule)
  return `${number}${suffix}`
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
