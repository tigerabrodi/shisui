import { Trash } from '~/icons/Trash'
import * as React from 'react'
import { Question } from '@prisma/client'
import { ordinalSuffix } from '~/lib/utils'

type Props = {
  question: Question
  order: number
  deleteQuestion: (questionId: number) => void
}

/* `order` is the index + 1, since we want to track the position for the users and not really the index itself. */
export const QuestionInput: React.FC<Props> = ({
  question,
  order,
  deleteQuestion,
}) => {
  return (
    <div className="w-full flex items-center justify-between mt-5 first-of-type:mt-8 md:first-of-type:mt-10 md:mt-8">
      <label htmlFor={`question-${question.id}`} className="sr-only">
        {`${ordinalSuffix(order)} question`}
      </label>
      <input
        id={`question-${question.id}`}
        name="question"
        type="text"
        defaultValue={question.title}
        placeholder="How was your diet today?"
        className="text-white bg-black pl-2 text-left font-bold font-serif text-sm w-60 h-7 md:w-9/12 md:h-11 md:text-xl"
      />
      <button
        aria-label={`Delete ${ordinalSuffix(order)} question`}
        className="question-button"
        type="button"
        onClick={() => deleteQuestion(question.id)}
      >
        <Trash className="question-icon" />
      </button>
    </div>
  )
}
