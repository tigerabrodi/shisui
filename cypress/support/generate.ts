import { build, fake } from '@jackfranklin/test-data-bot'

type QuestionAnswer = {
  question: string
  answer: string
}

export const buildQuestionAnswer = build<QuestionAnswer>('QuestionAnswer', {
  fields: {
    question: fake((f) => f.random.words(3)),
    answer: fake((f) => f.random.words(5)),
  },
})
