import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { AssessmentFeed } from '~/components/AssessmentFeed'
import { findManyAssessments } from '~/db/db-operations'
import { Assessment } from '~/lib/types'
import { convertToDate } from '~/lib/utils'

export const meta: MetaFunction = () => {
  return {
    title: 'Weekly Assessments',
    description: 'Your weekly assessments.',
  }
}

type LoaderData = {
  assessments: Array<Assessment>
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const dbAssessments = await findManyAssessments(user.id, 'WEEKLY')

  const assessments = dbAssessments.map((assessment) => ({
    ...assessment,
    createdAt: convertToDate(assessment.createdAt),
  }))

  return { assessments }
}

export default function Weekly() {
  const { assessments } = useLoaderData<LoaderData>()

  return <AssessmentFeed assessments={assessments} />
}
