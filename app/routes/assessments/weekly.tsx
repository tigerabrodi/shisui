import { MetaFunction } from 'remix'
import { AssessmentFeed } from '~/components/AssessmentFeed'

export const meta: MetaFunction = () => {
  return {
    title: 'Weekly Assessments',
    description: 'Your weekly assessments.',
  }
}

export default function Weekly() {
  return <AssessmentFeed />
}
