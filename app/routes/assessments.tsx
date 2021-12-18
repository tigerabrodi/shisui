import { Link, LoaderFunction, Outlet, redirect, useLocation } from 'remix'
import { authenticator } from '~/auth/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  if (request.url.endsWith('/assessments')) {
    return redirect('/assessments/daily')
  }

  return null
}

const BottomLink: React.FC<{ to: string }> = ({ to, children }) => (
  <Link
    to={to}
    prefetch="intent"
    className="bg-black text-white text-lg w-24 h-9 font-sans flex items-center justify-center rounded-sm shadow-hover transition-all md:w-32 md:h-14 md:text-2xl"
  >
    {children}
  </Link>
)

export default function Assessments() {
  const location = useLocation()
  const typeOfAssessment = location.pathname.split('/')[2]

  return (
    <main className="h-full w-full flex-col-center pb-6 md:pb-28">
      <h1 className="heading-one mt-2">Assessments</h1>
      <Outlet />
      <div className="flex items-center mt-auto gap-10 md:gap-44">
        <BottomLink to={`/${typeOfAssessment}/new`}>Write</BottomLink>
        <BottomLink to={`/${typeOfAssessment}/questions`}>Questions</BottomLink>
      </div>
    </main>
  )
}
