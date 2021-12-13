import { Link } from "remix";
import { Add } from "~/icons/Add";
import { Trash } from "~/icons/Delete";

export default function Questions() {
  return (
    <>
      <h2 className="heading-two">Questions for your daily assessments.</h2>
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
        <button aria-label="Delete question" className="question-button">
          <Trash className="question-icon" />
        </button>
      </div>
      <div className="w-full flex items-center justify-end mt-5 md:mt-8">
        <button aria-label="Add question" className="question-button">
          <Add className="question-icon" />
        </button>
      </div>

      <div className="mt-auto w-60 flex items-center justify-between pb-10 pt-8 md:w-5/6 md:pb-32">
        <Link to="/assessments/daily" className="bottom-button-link">
          Cancel
        </Link>
        <button className="bottom-button-link button-active">Save</button>
      </div>
    </>
  );
}
