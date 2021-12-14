import { MetaFunction } from 'remix'
import { AssessmentFeed } from '~/components/AssessmentFeed'

export const meta: MetaFunction = () => {
  return {
    title: 'Daily Assessments',
    description: 'Your daily assessments.',
  }
}

export default function Daily() {
  return <AssessmentFeed />
}
