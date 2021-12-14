import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from 'remix'
import { v4 } from 'uuid'
import * as React from 'react'
import { authenticator } from '~/auth/auth.server'
import { Add } from '~/icons/Add'
import { Question } from '@prisma/client'
import { db } from '~/db/db.server'
import { QuestionInput } from '~/components/QuestionInput'
import toast from 'react-hot-toast'

type ActionData = {
  isError?: boolean
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData | undefined> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const form = await request.formData()
  const allQuestions = form.getAll('question')
  const isAnyQuestionsEmpty = allQuestions.some((question) => !question)

  if (isAnyQuestionsEmpty) {
    return { isError: true }
  }

  /*   await db.question.deleteMany({
    where: {
      userId: user.id,
      type: 'DAILY',
    },
  }) */
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const dbQuestions = await db.question.findMany({
    where: {
      userId: user.id,
      type: 'DAILY',
    },
  })

  const questions = dbQuestions.length ? dbQuestions : [{ id: v4(), title: '' }]

  return questions
}

export default function Questions() {
  const actionData = useActionData<ActionData>()
  const loaderQuestions = useLoaderData<Question[]>()
  const [questions, setQuestions] = React.useState<Question[]>(loaderQuestions)

  const deleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((question) => question.id !== questionId))
  }

  const addQuestion = () => {
    setQuestions([...questions, { id: v4(), title: '' }] as Question[])
  }

  React.useEffect(() => {
    if (actionData?.isError) {
      toast.error('Please fill in all the questions you added.')
      actionData.isError = false
    }
  }, [actionData?.isError])

  return (
    <>
      <h2 className="heading-two">Questions for your daily assessments.</h2>
      <Form
        action="/daily/questions"
        method="post"
        className="w-full h-full flex-col-center"
      >
        {questions.map((question, index) => (
          <QuestionInput
            key={question.id}
            order={index + 1}
            question={question}
            deleteQuestion={deleteQuestion}
          />
        ))}
        <div className="w-full flex items-center justify-end mt-5 md:mt-8">
          <button
            aria-label="Add question"
            className="question-button"
            type="button"
            onClick={() => addQuestion()}
          >
            <Add className="question-icon" />
          </button>
        </div>

        <div className="mt-auto w-60 flex items-center justify-between pb-10 pt-8 md:w-5/6 md:pb-32 md:pt-16">
          <Link to="/assessments/daily" className="bottom-button-link">
            Cancel
          </Link>
          <button className="bottom-button-link button-active" type="submit">
            Save
          </button>
        </div>
      </Form>
    </>
  )
}
