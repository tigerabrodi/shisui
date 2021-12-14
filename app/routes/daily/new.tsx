import { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'Daily Assessment',
    description: 'Assessment for today.',
  }
}

export default function New() {
  return <div>Hello World</div>
}
