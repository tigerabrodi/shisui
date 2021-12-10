import { LoaderFunction, Outlet, redirect } from "remix";
import { authenticator } from "~/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  if (request.url.endsWith("/assessments")) {
    return redirect("/assessments/daily");
  }

  return null;
};

export default function Assessments() {
  return (
    <main>
      <h1>Assessments</h1>
      <Outlet />
    </main>
  );
}
