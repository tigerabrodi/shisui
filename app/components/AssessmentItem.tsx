import * as React from 'react'
import { Link } from 'remix'
import { Assessment } from '~/lib/types'
import { formatOrdinals } from '~/lib/utils'

export const AssessmentItem: React.FC<{ assessment: Assessment }> = ({
  assessment,
}) => {
  const assessmentDetailRoute = `/${assessment.type.toLowerCase()}/${
    assessment.id
  }`
  const createdAtDividedByComma = assessment.createdAt.split(',')
  const dayOfWeek = createdAtDividedByComma[0]

  const dayOfMonthWithSuffix = formatOrdinals(
    Number(createdAtDividedByComma[1].split(' ')[2])
  )
  const monthWithSuffix = `${
    createdAtDividedByComma[1].split(' ')[1]
  } ${dayOfMonthWithSuffix}`
  const assessmentYear = createdAtDividedByComma[2]

  return (
    <li className="w-72 min-h-[26px] rounded-sm flex items-center pl-2 relative bg-black md:w-full md:min-h-[40px]">
      <Link
        to={assessmentDetailRoute}
        className="text-white font-sans text-xs font-normal hover:underline md:text-lg"
      >
        Written on {dayOfWeek}, {monthWithSuffix}
      </Link>
      <span className="absolute top-[3px] right-[3px] bg-white px-1 text-black rounded-sm font-normal text-[10px] md:text-base md:top-1 md:right-1">
        {assessmentYear}
      </span>
    </li>
  )
}
