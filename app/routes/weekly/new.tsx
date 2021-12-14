import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'Weekly Assessment',
    description: 'Assessment for this week.',
  }
}

export default function New() {
  return <div>Hello World</div>
}
