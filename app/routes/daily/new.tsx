import { Question } from '@prisma/client'
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

export const meta: MetaFunction = () => {
  return {
    title: 'Daily Assessment',
    description: 'Assessment for today.',
  }
}

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const form = await request.formData()
  const questions = await findQuestions(user.id, 'DAILY')

  const questionsAnswers = questions.map((question) => {
    return {
      question: question.title,
      answer: form.get(question.title) as string,
    }
  })

  const assessment = await db.assessment.create({
    data: {
      userId: user.id,
      questionsAnswers: {
        create: [...questionsAnswers],
      },
    },
  })

  return redirect(`/daily/${assessment.id}`, { status: 201 })
}

type LoaderData = {
  questions: Question[]
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const questions = await findQuestions(user.id, 'DAILY')

  return { questions }
}

export default function New() {
  const { questions } = useLoaderData<LoaderData>()

  return (
    <>
      <h2 className="heading-two">Assessment for today.</h2>
      <Form
        className="w-full h-full flex-col-center"
        action="/daily/new"
        method="post"
      >
        {questions.map((question) => (
          <div
            key={question.id}
            className="w-full min-h-[128px] mt-6 flex flex-col justify-between items-start md:min-h-[190px] md:mt-12"
          >
            <label
              htmlFor={String(question.id)}
              className="font-bold font-serif text-lg text-black md:text-2xl"
            >
              {question.title}
            </label>
            <textarea
              name="question"
              id={String(question.id)}
              className="w-full bg-black h-20 text-white rounded-sm pl-2 pt-2 font-sans font-normal text-sm md:text-lg md:h-32"
              placeholder="Today I..."
            />
          </div>
        ))}
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
