import { createCookieSessionStorage } from "remix";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
