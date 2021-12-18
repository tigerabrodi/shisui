import { LoaderFunction } from 'remix'
import { authenticator } from '~/auth/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate('google', request, {
    successRedirect: '/assessments/daily',
    failureRedirect: '/login',
  })
}
