import {
  Link as RemixLink,
  LoaderFunction,
  Outlet,
  redirect,
  useLocation,
} from "remix";
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

const Link: React.FC<{ to: string }> = ({ to, children }) => (
  <RemixLink
    to={to}
    prefetch="intent"
    className="bg-black text-white text-lg w-24 h-9 font-sans shadow-sm shadow-black flex items-center justify-center rounded-sm hover:shadow-md hover:shadow-black transition-all md:w-32 md:h-14 md:text-2xl"
  >
    {children}
  </RemixLink>
);

export default function Assessments() {
  const location = useLocation();
  const typeOfAssessment = location.pathname.split("/")[2];

  return (
    <main className="h-full w-full flex flex-col items-center pb-6 md:pb-28">
      <h1 className="font-bold text-3xl text-black mt-2 md:text-6xl md:mt-2">
        Assessments
      </h1>
      <Outlet />
      <div className="flex items-center mt-auto gap-10 md:gap-44">
        <Link to={`/${typeOfAssessment}/new`}>Write</Link>
        <Link to={`/${typeOfAssessment}/questions`}>Questions</Link>
      </div>
    </main>
  );
}
