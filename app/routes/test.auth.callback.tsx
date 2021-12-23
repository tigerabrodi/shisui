import { LoaderFunction, redirect } from 'remix'
import { authenticator } from '~/auth/auth.server'
import { getSession, commitSession } from '~/auth/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  const user = { id: '1' }

  session.set(authenticator.sessionKey, user)

  console.log(session, authenticator.sessionKey, user)

  return redirect('/assessments/daily', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
