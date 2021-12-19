import { Question, QuestionType } from '@prisma/client'
import { v4 } from 'uuid'
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
import { authenticator } from '~/auth/auth.server'
import { findQuestions } from '~/db/db-operations'
import { db } from '~/db/db.server'
import { QuestionRoute, TypeOfDate, ValidationKey } from '~/lib/types'
import { doesAnyTypeExistInParams, toQuestionAnswer } from '~/lib/utils'
import { QuestionAnswerItem } from '~/components/QuestionAnswerItem'
import { AssessmentQuestionItem } from '~/components/AssessmentQuestionItem'
import {
  validationCommitSession,
  validationGetSession,
} from '~/lib/validationSession.server'

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined
}) => {
  if (!data) {
    return {
      title: 'Not found',
      description: 'oopsi wrong page',
    }
  }

  const typeOfDate = data.type.split('l')[0]

  return {
    title: `${data.type} Assessment`,
    description: `Assessment for this ${typeOfDate}.`,
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const session = await validationGetSession(request.headers.get('Cookie'))

  const dbQuestionType = (params.type as string).toUpperCase() as QuestionType
  const routeQuestionType = params.type as QuestionType

  const form = await request.formData()
  const questions = await findQuestions(user.id, dbQuestionType)

  const questionsAnswers = questions.map((question) =>
    toQuestionAnswer(question, form)
  )

  const assessment = await db.assessment.create({
    data: {
      userId: user.id,
      type: dbQuestionType,
      questionsAnswers: {
        create: questionsAnswers,
      },
    },
  })

  session.flash(ValidationKey.SUCCESS, 'Successfully created assessment!')

  return redirect(`/${routeQuestionType}/${assessment.id}`, {
    headers: {
      'Set-Cookie': await validationCommitSession(session),
    },
  })
}

type LoaderData = {
  questions: Question[]
  type: QuestionRoute
  typeOfDate: TypeOfDate
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const session = await validationGetSession(request.headers.get('Cookie'))

  const type = params.type as QuestionRoute

  if (doesAnyTypeExistInParams(type)) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const dbQuestionType = (params.type as string).toUpperCase() as QuestionType
  const questions = await findQuestions(user.id, dbQuestionType)

  const typeOfDate =
    type === 'daily' ? 'day' : type === 'weekly' ? 'week' : 'month'

  return json<LoaderData>(
    { questions, type, typeOfDate },
    {
      headers: {
        'Set-Cookie': await validationCommitSession(session),
      },
    }
  )
}

export default function New() {
  const { questions, type, typeOfDate } = useLoaderData<LoaderData>()
  const transition = useTransition()

  if (transition.submission) {
    const form = transition.submission.formData
    const questionsAnswers = questions.map((question) =>
      toQuestionAnswer(question, form)
    )

    return (
      <>
        <h2 className="heading-two opacity-70">Written on ........</h2>
        {questionsAnswers.map((questionAnswer) => (
          <QuestionAnswerItem
            key={v4()}
            questionAnswer={{ ...questionAnswer, id: v4(), assessmentId: v4() }}
            isOptimisticallyShown
          />
        ))}
      </>
    )
  }

  return (
    <>
      <h2 className="heading-two">Assessment for this {typeOfDate}.</h2>
      <Form
        className="w-full h-full flex-col-center"
        action={`/${type}/new`}
        method="post"
      >
        {questions.length ? (
          <>
            {questions.map((question) => (
              <AssessmentQuestionItem
                key={question.id}
                question={question}
                typeOfDate={typeOfDate}
              />
            ))}
            <div className="mt-auto w-60 flex items-center justify-between pb-10 pt-8 md:w-5/6 md:pb-32 md:pt-16">
              <Link to="/assessments/weekly" className="bottom-button-link">
                Cancel
              </Link>
              <button
                className="bottom-button-link button-active"
                type="submit"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="w-full mt-12 flex-center justify-between items-start md:mt-12">
            <p className="text-black text-sm px-4 md:text-xl text-center">
              No questions have been written for this type of assessment.
            </p>
          </div>
        )}
      </Form>
    </>
  )
}
