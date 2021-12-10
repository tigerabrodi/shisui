import { LoaderFunction, Outlet, redirect } from "remix";
import { authenticator } from "~/auth/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (request.url.endsWith("/assessments")) {
    return redirect("/assessments/daily");
  }

  return null;
};

export default function Assessments() {
  return (
    <main className="h-full flex flex-col items-center pb-6">
      <h1 className="">Assessments</h1>
      <Outlet />
    </main>
  );
}
