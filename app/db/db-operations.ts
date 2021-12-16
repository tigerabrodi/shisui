import { Question, QuestionType, User } from '@prisma/client'
import { db } from './db.server'

const findUser = async (id: string) => {
  const foundUser = await db.user.findFirst({
    where: {
      id,
    },
  })

  return foundUser
}

const createUser = async (id: string) => {
  const createdUser = await db.user.create({
    data: {
      id,
    },
  })

  return createdUser
}

export const findOrCreateUser = async (id: string) => {
  const foundUser = await findUser(id)

  if (foundUser) {
    return foundUser
  }

  const createdUser = await createUser(id)
  return createdUser
}

export const deleteQuestions = async (userId: User['id'], type: QuestionType) =>
  await db.question.deleteMany({
    where: {
      userId,
      type,
    },
  })

export const createQuestions = async (questions: Question[]) =>
  await db.question.createMany({
    data: questions,
  })

export const findQuestions = async (userId: string, type: QuestionType) =>
  await db.question.findMany({
    where: {
      userId,
      type,
    },
  })

export const findManyAssessments = async (userId: string, type: QuestionType) =>
  await db.assessment.findMany({
    where: {
      AND: [
        {
          type,
        },
        {
          userId,
        },
      ],
    },
    include: {
      questionsAnswers: true,
    },
  })
