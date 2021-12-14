import { MetaFunction } from 'remix'
import { AssessmentFeed } from '~/components/AssessmentFeed'

export const meta: MetaFunction = () => {
  return {
    title: 'Monthly Assessments',
    description: 'Your monthly assessments.',
  }
}

export default function Monthly() {
  return <AssessmentFeed />
}
