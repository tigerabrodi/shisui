import { LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/assessments/daily",
  });

  if (!user) {
    return redirect("/login");
  }
};
