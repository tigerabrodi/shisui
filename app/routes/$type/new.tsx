import { Question, QuestionType } from '@prisma/client'
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
} from 'remix'
import { authenticator } from '~/auth/auth.server'
import { findQuestions } from '~/db/db-operations'
import { db } from '~/db/db.server'
import { QuestionRoute, TypeOfDate } from '~/lib/types'
import { doesAnyTypeExistInParams, toQuestionAnswer } from '~/lib/utils'

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

  return redirect(`/${routeQuestionType}/${assessment.id}`)
}

type LoaderData = {
  questions: Question[]
  type: QuestionRoute
  typeOfDate: TypeOfDate
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

  const dbQuestionType = (params.type as string).toUpperCase() as QuestionType
  const questions = await findQuestions(user.id, dbQuestionType)

  const typeOfDate =
    type === 'daily' ? 'day' : type === 'weekly' ? 'week' : 'month'

  return { questions, type, typeOfDate }
}

export default function New() {
  const { questions, type, typeOfDate } = useLoaderData<LoaderData>()

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
            {questions.map(({ title, id }) => (
              <div
                key={id}
                className="w-full min-h-[128px] mt-6 flex flex-col justify-between items-start md:min-h-[190px] md:mt-12"
              >
                <label
                  htmlFor={String(id)}
                  className="font-bold font-serif text-lg text-black md:text-2xl"
                >
                  {title}
                </label>
                <textarea
                  name={title}
                  id={String(id)}
                  className="w-full bg-black h-20 text-white rounded-sm pl-2 pt-2 font-sans font-normal text-sm md:text-lg md:h-32"
                  placeholder={`This ${typeOfDate} I...`}
                />
              </div>
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
