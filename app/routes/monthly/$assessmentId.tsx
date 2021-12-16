import { LoaderFunction, useCatch, useLoaderData } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { findUniqueAssessment } from '~/db/db-operations'
import { Assessment } from '~/lib/types'
import { convertToDate } from '~/lib/utils'

type LoaderData = {
  assessment: Assessment
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const dbAssessment = await findUniqueAssessment(params.assessmentId as string)

  if (!dbAssessment) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  if (user.id !== dbAssessment.userId) {
    throw new Response('Forbidden', {
      status: 403,
    })
  }

  const assessment = {
    ...dbAssessment,
    createdAt: convertToDate(dbAssessment.createdAt),
  } as unknown as Assessment

  return { assessment }
}

export default function Assessment() {
  const {
    assessment: { questionsAnswers, createdAt },
  } = useLoaderData<LoaderData>()

  return (
    <>
      <h2 className="heading-two">Written on {createdAt}</h2>
      {questionsAnswers.map(({ id, question, answer }) => (
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
