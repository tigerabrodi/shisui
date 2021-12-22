import { Question } from '@prisma/client'
import * as React from 'react'
import { TypeOfDate } from '~/lib/types'

export const AssessmentQuestionItem: React.FC<{
  typeOfDate: TypeOfDate
  question: Question
}> = ({ typeOfDate, question: { id, title } }) => {
  return (
    <div
      key={id}
      className={`w-full min-h-[128px] mt-6 flex flex-col justify-between items-start md:min-h-[190px] md:mt-12`}
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
      />
    </div>
  )
}
