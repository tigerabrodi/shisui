import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useTransition,
} from 'remix'
import { v4 } from 'uuid'
import * as React from 'react'
import { authenticator } from '~/auth/auth.server'
import { Add } from '~/icons/Add'
import { Question, QuestionType } from '@prisma/client'
import { NewQuestionItem } from '~/components/NewQuestionItem'
import {
  createQuestions,
  deleteQuestions,
  findQuestions,
} from '~/db/db-operations'
import { doesAnyTypeExistInParams, transformToQuestion } from '~/lib/utils'
import { QuestionRoute, ValidationKey } from '~/lib/types'
import { AssessmentQuestionItem } from '~/components/AssessmentQuestionItem'
import {
  validationCommitSession,
  validationGetSession,
} from '~/lib/validationSession.server'

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

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | null> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const session = await validationGetSession(request.headers.get('Cookie'))

  const dbQuestionType = (params.type as string).toUpperCase() as QuestionType

  const form = await request.formData()
  const allQuestionTitles = form.getAll('question')
  const isAnyQuestionsEmpty = allQuestionTitles.some((title) => !title)

  if (isAnyQuestionsEmpty) {
    session.flash(ValidationKey.ERROR, 'Please fill in all the questions!')

    return json(null, {
      headers: {
        'Set-Cookie': await validationCommitSession(session),
      },
    })
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

  session.flash(
    ValidationKey.SUCCESS,
    'Questions have been successfully added!'
  )

  return redirect(`/${params.type}/new`, {
    headers: {
      'Set-Cookie': await validationCommitSession(session),
    },
  })
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

  if (doesAnyTypeExistInParams(type)) {
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
  const { loaderQuestions, type, dbQuestionType } = useLoaderData<LoaderData>()
  const transition = useTransition()
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

  if (transition.submission) {
    const allQuestionTitles = transition.submission.formData.getAll(
      'question'
    ) as string[]
    const areAllQuestionsFilled = allQuestionTitles.every((title) => title)

    const typeOfDate =
      type === 'daily' ? 'day' : type === 'weekly' ? 'week' : 'month'

    if (areAllQuestionsFilled) {
      return (
        <>
          <h2 className="heading-two">Assessment for this {typeOfDate}.</h2>
          <Form
            className="w-full h-full flex-col-center"
            action={`/${type}/new`}
            method="post"
          >
            {allQuestionTitles.map((title, index) => (
              <AssessmentQuestionItem
                key={index}
                question={{
                  title,
                  id: index,
                  userId: v4(),
                  type: dbQuestionType,
                }}
                typeOfDate={typeOfDate}
                isOptimisticallyShown
              />
            ))}
            <div className="mt-auto w-60 flex items-center justify-between pb-10 pt-8 md:w-5/6 md:pb-32 md:pt-16">
              <Link
                to={`/${type}/questions`}
                className="bottom-button-link opacity-80"
              >
                Cancel
              </Link>
              <button
                className="bottom-button-link button-active opacity-80"
                type="submit"
                disabled
              >
                Save
              </button>
            </div>
          </Form>
        </>
      )
    }
  }

  return (
    <>
      <h2 className="heading-two">Questions for your {type} assessments.</h2>
      <Form
        action={`/${type}/questions`}
        method="post"
        className="w-full h-full flex-col-center"
      >
        {questions.map((question, index) => (
          <NewQuestionItem
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
