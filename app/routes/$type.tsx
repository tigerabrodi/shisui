import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { BackLink } from '~/components/BackLink'
import { QuestionRoute, questionTypes } from '~/lib/types'

type LoaderData = {
  type: QuestionRoute
  isQuestionsPage: boolean
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const type = params.type as QuestionRoute

  if (!questionTypes.includes(type)) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const isQuestionsPage = request.url.includes('questions')

  return { type, isQuestionsPage }
}

export default function Daily() {
  const { type, isQuestionsPage } = useLoaderData<LoaderData>()

  return (
    <main className="w-72 h-full flex-col-center relative md:w-3/5 lg:w-3/6 xl:w-4/12">
      <h1 className="heading-one">
        {isQuestionsPage ? 'Questions' : 'Assessment'}
      </h1>
      <BackLink
        to={`/assessments/${type}`}
        ariaLabel={`Back to ${type} assessments`}
      />
      <Outlet />
    </main>
  )
}
