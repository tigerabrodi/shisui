import { Form } from "remix";
import { JournalIcon } from "~/icons/Journal";
import { ActionFunction, LoaderFunction } from "remix";
import { authenticator } from "~/auth/auth.server";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate("google", request, {
    successRedirect: "/assessments/daily",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/assessments/daily",
  });

  return null;
};

export default function Login() {
  return (
    <main className="h-full w-full flex flex-col items-center">
      <h1 className="mt-20 font-serif text-black font-bold text-4xl md:text-6xl md:mt-24">
        Shisui
      </h1>
      <h2 className="text-black mt-2 text-base text-center md:text-2xl md:mt-6">
        Strive to be better than your past.
      </h2>
      <JournalIcon className="mt-6 w-20 h-20 md:w-36 md:h-36 md:mt-14" />
      <Form className="mt-20 md:mt-48" action="/login" method="post">
        <button className="px-5 py-1 text-white bg-black text-lg rounded-sm md:text-2xl md:py-2 md:px-8 shadow-hover active:scale-[0.98] active:shadow-sm transition-all">
          Login
        </button>
      </Form>
    </main>
  );
}
