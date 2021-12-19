import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useTransition,
} from 'remix'
import { authenticator } from '~/auth/auth.server'
import { BackLink } from '~/components/BackLink'
import { QuestionRoute } from '~/lib/types'
import { doesAnyTypeExistInParams } from '~/lib/utils'

type LoaderData =
  | {
      type: QuestionRoute
      isQuestionsPage: boolean
    }
  | Response

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const type = params.type as QuestionRoute

  if (request.url.endsWith(type)) {
    return redirect(`/${type}/new`)
  }

  if (doesAnyTypeExistInParams(type)) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const isQuestionsPage = request.url.includes('questions')

  return { type, isQuestionsPage }
}

export default function Type() {
  const { type, isQuestionsPage } =
    useLoaderData<Exclude<LoaderData, Response>>()
  const transition = useTransition()

  const allFormQuestions = transition?.submission?.formData.getAll(
    'question'
  ) as string[]

  const isAnyFormQuestionsEmpty = allFormQuestions?.some(
    (question) => !question
  )

  const shouldShowQuestions = isQuestionsPage && !transition.submission
  const isSubmissionNotOptimistic =
    transition.submission && isAnyFormQuestionsEmpty

  return (
    <main className="w-72 h-full flex-col-center relative md:w-3/5 lg:w-3/6 xl:w-4/12">
      <h1 className="heading-one">
        {shouldShowQuestions || isSubmissionNotOptimistic
          ? 'Questions'
          : 'Assessment'}
      </h1>
      <BackLink
        to={`/assessments/${type}`}
        ariaLabel={`Back to ${type} assessments`}
      />
      <Outlet />
    </main>
  )
}
