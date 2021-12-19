import { createCookieSessionStorage } from 'remix'

export const validationSession = createCookieSessionStorage({
  cookie: {
    name: '_validation',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['secr3t'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const {
  getSession: validationGetSession,
  commitSession: validationCommitSession,
  destroySession: validationDestroySession,
} = validationSession
