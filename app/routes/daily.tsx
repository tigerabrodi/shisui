import { LoaderFunction, Outlet, redirect, useLocation } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { BackLink } from '~/components/BackLink'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  if (request.url.endsWith('/daily')) {
    return redirect('/assessments/daily')
  }

  return null
}

export default function Daily() {
  const location = useLocation()
  const isQuestionsPage = location.pathname.includes('/questions')

  return (
    <main className="w-72 h-full flex-col-center relative md:w-3/5 lg:w-3/6 xl:w-4/12">
      <h1 className="heading-one">
        {isQuestionsPage ? 'Questions' : 'Assessment'}
      </h1>
      <BackLink to="/assessments/daily" ariaLabel="Back to daily assessments" />
      <Outlet />
    </main>
  )
}
