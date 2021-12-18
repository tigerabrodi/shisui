import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
  useNavigate,
} from 'remix'
import { v4 } from 'uuid'
import * as React from 'react'
import { authenticator } from '~/auth/auth.server'
import { Add } from '~/icons/Add'
import { Question, QuestionType } from '@prisma/client'
import { QuestionInput } from '~/components/QuestionInput'
import toast from 'react-hot-toast'
import {
  createQuestions,
  deleteQuestions,
  findQuestions,
} from '~/db/db-operations'
import { transformToQuestion } from '~/lib/utils'
import { QuestionRoute, questionTypes } from '~/lib/types'

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  if (!data) {
    return {
      title: 'Not Found',
      description: 'No page found',
    }
  }

  return {
    title: 'Questions',
    description: `Questions for the ${data.type} assessments.`,
  }
}

type ActionData = {
  isError?: boolean
  isSuccess?: boolean
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const dbQuestionType = (params.type as string).toUpperCase() as QuestionType

  const form = await request.formData()
  const allQuestionTitles = form.getAll('question')
  const isAnyQuestionsEmpty = allQuestionTitles.some((title) => !title)

  if (isAnyQuestionsEmpty) {
    return { isError: true }
  }

  await deleteQuestions(user.id, dbQuestionType)

  const questions = allQuestionTitles.map((title) =>
    transformToQuestion({
      title: title as string,
      type: dbQuestionType,
      userId: user.id,
    })
  )

  await createQuestions(questions)

  return { isSuccess: true }
}

type LoaderData = {
  loaderQuestions: Question[]
  type: QuestionRoute
  dbQuestionType: QuestionType
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const type = params.type as QuestionRoute

  if (!questionTypes.includes(type)) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const dbQuestionType = (type as string).toUpperCase() as QuestionType

  const dbQuestions = await findQuestions(user.id, dbQuestionType)

  const questions = dbQuestions.length
    ? dbQuestions
    : [{ id: v4(), title: '', type: dbQuestionType }]

  return { loaderQuestions: questions as Question[], type, dbQuestionType }
}

export default function Questions() {
  const actionData = useActionData<ActionData>()
  const { loaderQuestions, type, dbQuestionType } = useLoaderData<LoaderData>()
  const navigate = useNavigate()
  const [questions, setQuestions] = React.useState<Question[]>(loaderQuestions)

  const deleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((question) => question.id !== questionId))
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: v4(), title: '', type: dbQuestionType },
    ] as Question[])
  }

  React.useEffect(() => {
    if (actionData?.isError) {
      toast.error('Please fill in all the questions you added.')
      actionData.isError = false
    }

    if (actionData?.isSuccess) {
      toast.success('Questions have successfully been saved!')
      actionData.isSuccess = false
      navigate(`/${type}/new`)
    }
  }, [actionData?.isError, actionData?.isSuccess])

  return (
    <>
      <h2 className="heading-two">Questions for your {type} assessments.</h2>
      <Form
        action={`/${type}/questions`}
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
          <Link to={`/assessments/${type}`} className="bottom-button-link">
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
