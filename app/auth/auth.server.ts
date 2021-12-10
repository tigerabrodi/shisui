// app/auth.server.ts
import { Authenticator, GoogleProfile, GoogleStrategy } from "remix-auth";
import { sessionStorage } from "./session.server";

type User = {
  userId: string;
};

export async function login(profile: GoogleProfile): Promise<User> {
  return { userId: profile.id };
}

export const authenticator = new Authenticator<User>(sessionStorage);

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Missing GOOGLE_CLIENT_ID env");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_SECRET env");
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (_, __, ___, profile) => login(profile)
  )
);