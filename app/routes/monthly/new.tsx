import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'Monthly Assessment',
    description: 'Assessment for this month.',
  }
}

export default function New() {
  return <div>Hello World</div>
}
