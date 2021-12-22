import { QuestionAnswer } from '@prisma/client'
import * as React from 'react'

export const QuestionAnswerItem: React.FC<{
  questionAnswer: Pick<QuestionAnswer, 'answer' | 'question'>
}> = ({ questionAnswer: { answer, question } }) => {
  return (
    <article
      className={`w-full min-h-[60px] mt-6 flex flex-col justify-between items-start md:min-h-[80px] md:mt-12`}
    >
      <h3 className="font-bold font-serif text-lg text-black mb-2 md:text-2xl">
        {question}
      </h3>
      <p className="font-normal text-black font-sans text-base md:text-lg">
        {answer}
      </p>
    </article>
  )
}
