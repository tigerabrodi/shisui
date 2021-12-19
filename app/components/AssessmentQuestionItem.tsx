import { Question } from '@prisma/client'
import * as React from 'react'
import { TypeOfDate } from '~/lib/types'

export const AssessmentQuestionItem: React.FC<{
  typeOfDate: TypeOfDate
  question: Question
  isOptimisticallyShown?: boolean
}> = ({
  typeOfDate,
  question: { id, title },
  isOptimisticallyShown = false,
}) => {
  return (
    <div
      key={id}
      className={`w-full min-h-[128px] mt-6 flex flex-col justify-between items-start md:min-h-[190px] md:mt-12 ${
        isOptimisticallyShown ? 'opacity-70' : 'opacity-100'
      }`}
    >
      <label
        htmlFor={String(id)}
        className="font-bold font-serif text-lg text-black md:text-2xl"
      >
        {title}
      </label>
      <textarea
        name={title}
        id={String(id)}
        className="w-full bg-black h-20 text-white rounded-sm pl-2 pt-2 font-sans font-normal text-sm md:text-lg md:h-32"
        placeholder={`This ${typeOfDate} I...`}
        disabled={isOptimisticallyShown}
      />
    </div>
  )
}
