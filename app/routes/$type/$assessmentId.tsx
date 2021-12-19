import { LoaderFunction, MetaFunction, useCatch, useLoaderData } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { QuestionAnswerItem } from '~/components/QuestionAnswerItem'
import { findUniqueAssessment } from '~/db/db-operations'
import { Assessment } from '~/lib/types'
import { convertToDate } from '~/lib/utils'

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined
}) => {
  if (!data) {
    return {
      title: 'No assessment',
      description: 'No assessment found',
    }
  }
  return {
    title: 'Weekly Assessment',
    description: `Assessment in ${data.assessment.createdAt}`,
  }
}

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
      {questionsAnswers.map((questionAnswer) => (
        <QuestionAnswerItem
          key={questionAnswer.id}
          questionAnswer={questionAnswer}
        />
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
