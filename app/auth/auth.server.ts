import { User } from '@prisma/client'
import { Authenticator, GoogleProfile, GoogleStrategy } from 'remix-auth'
import { findOrCreateUser } from '~/db/db-operations'
import { authSessionStorage } from './session.server'

export async function login(profile: GoogleProfile): Promise<User> {
  const user = await findOrCreateUser(profile.id)
  return user
}

export const authenticator = new Authenticator<User>(authSessionStorage)

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLIENT_ID env')
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_SECRET env')
}

if (!process.env.GOOGLE_CALLBACK_URL) {
  throw new Error('Missing GOOGLE_CALLBACK_URL env')
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, ___, profile) => login(profile)
  )
)
