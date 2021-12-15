import * as React from 'react'
import { Assessment } from '~/lib/types'
import { AssessmentItem } from './AssessmentItem'

export const AssessmentFeed: React.FC<{ assessments: Assessment[] }> = ({
  assessments,
}) => {
  return (
    <ul className="mt-6 flex flex-col items-center gap-4 max-h-80 overflow-auto md:w-3/5 lg:w-2/5 xl:w-2/6 md:mt-12 md:max-h-[500px] xl:max-h-[600px]">
      {assessments.map((assessment) => (
        <AssessmentItem assessment={assessment} />
      ))}
    </ul>
  )
}
