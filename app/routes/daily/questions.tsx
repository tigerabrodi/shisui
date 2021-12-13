import { Link } from "remix";
import { Add } from "~/icons/Add";
import { Trash } from "~/icons/Delete";

export default function Questions() {
  return (
    <>
      <h2 className="font-normal text-sm text-black text-center mt-3 md:text-2xl md:mt-6">
        Questions for your daily assessments.
      </h2>
      <div className="w-full flex items-center justify-between mt-5 first-of-type:mt-8 md:first-of-type:mt-10 md:mt-8">
        <label htmlFor="question" className="sr-only">
          Question
        </label>
        <input
          id="question"
          type="text"
          placeholder="How was your diet today?"
          className="text-white bg-black pl-2 text-left font-bold font-serif text-sm w-60 h-7 md:w-9/12 md:h-11 md:text-xl"
        />
        <button
          aria-label="Delete question"
          className="w-[38px] h-7 bg-black flex-center shadow-hover transition-all md:w-2/12 md:h-11 button-active"
        >
          <Trash className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
      <div className="w-full flex items-center justify-end mt-5 md:mt-8">
        <button
          aria-label="Add Question"
          className="w-[38px] h-7 bg-black flex-center shadow-hover transition-all md:w-2/12 md:h-11 button-active"
        >
          <Add className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="mt-auto w-60 flex items-center justify-between pb-10 pt-8 md:w-5/6 md:pb-32">
        <Link
          to="/assessments/daily"
          className="shadow-hover transition-all w-[85px] h-9 bg-black text-white flex-center font-medium text-lg md:w-32 md:text-3xl md:h-14"
        >
          Cancel
        </Link>
        <button className="shadow-hover w-[85px] transition-all h-9 bg-black text-white flex-center font-medium text-lg md:w-32 md:text-3xl md:h-14 button-active">
          Save
        </button>
      </div>
    </>
  );
}
