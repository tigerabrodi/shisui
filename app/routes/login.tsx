import { Form } from "remix";
import { JournalIcon } from "~/icons/Journal";

export default function Login() {
  return (
    <main className="h-full w-full flex flex-col items-center">
      <h1 className="mt-20 font-serif text-black font-bold text-4xl">Shisui</h1>
      <h2 className="text-black mt-2 text-base text-center">
        Strive to be better than your past.
      </h2>
      <JournalIcon className="mt-6 w-20 h-20" />
      <Form className="mt-20" action="/login" method="post">
        <button className="px-5 py-1 text-white bg-black shadow-sm shadow-black text-lg rounded-sm">
          Login
        </button>
      </Form>
    </main>
  );
}
