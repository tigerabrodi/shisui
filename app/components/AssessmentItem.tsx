import * as React from 'react'
import { Link } from 'remix'
import { Assessment } from '~/lib/types'

export const AssessmentItem: React.FC<{ assessment: Assessment }> = ({
  assessment,
}) => {
  return (
    <li className="w-72 min-h-[26px] rounded-sm flex items-center pl-2 relative bg-black md:w-full md:min-h-[40px]">
      <Link
        to={`/${assessment.type.toLowerCase()}/${assessment.id}`}
        className="text-white font-sans text-xs font-normal hover:underline md:text-lg"
      >
        Written on {assessment.createdAt}
      </Link>
      <span className="absolute top-[3px] right-[3px] bg-white px-1 text-black rounded-sm font-normal text-[10px] md:text-base md:top-1 md:right-1">
        {assessment.createdAt.split(',')[2].trim()}
      </span>
    </li>
  )
}
