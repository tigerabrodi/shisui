import { Assessment, QuestionAnswer } from '@prisma/client'
import { LoaderFunction, useCatch, useLoaderData } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { db } from '~/db/db.server'

type LoaderData = {
  assessment: {
    questionsAnswers: QuestionAnswer[]
    createdAt: Date
    userId: string
  }
  createdAt: string
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId,
    },
    select: {
      questionsAnswers: true,
      createdAt: true,
      userId: true,
    },
  })

  if (!assessment) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  if (user.id !== assessment.userId) {
    throw new Response('Forbidden', {
      status: 403,
    })
  }

  const createdAt = assessment.createdAt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return { assessment, createdAt }
}

export default function Assessment() {
  const { assessment, createdAt } = useLoaderData<LoaderData>()

  return (
    <>
      <h2 className="heading-two">Written on {createdAt}</h2>
      {assessment.questionsAnswers.map(({ id, question, answer }) => (
        <article
          key={id}
          className="w-full min-h-[60px] mt-6 flex flex-col justify-between items-start md:min-h-[80px] md:mt-12"
        >
          <h3 className="font-bold font-serif text-lg text-black mb-2 md:text-2xl">
            {question}
          </h3>
          <p className="font-normal text-black font-sans text-base md:text-lg">
            {answer}
          </p>
        </article>
      ))}
    </>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 403:
      message = <p>You are not authorized to view this assessment.</p>
      break

    case 404:
      message = <p>This assessment does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <main title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </main>
  )
}
