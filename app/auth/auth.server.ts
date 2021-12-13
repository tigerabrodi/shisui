import { User } from "@prisma/client";
import { Authenticator, GoogleProfile, GoogleStrategy } from "remix-auth";
import { findOrCreateUser } from "~/db/db-operations";
import { sessionStorage } from "./session.server";

export async function login(profile: GoogleProfile): Promise<User> {
  const user = await findOrCreateUser(profile.id);
  return user;
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
