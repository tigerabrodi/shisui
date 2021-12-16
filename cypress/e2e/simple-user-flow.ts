import { buildQuestionAnswer } from '../support/generate'

beforeEach(() => {
  cy.clearCookies()
  cy.visit('/sign-in')
})

it('Simple user flow', () => {
  const { question, answer } = buildQuestionAnswer()
  console.log({ question, answer })
})
