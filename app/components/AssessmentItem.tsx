import * as React from "react";
import { Link } from "remix";

export const AssessmentItem: React.FC = () => {
  return (
    <li className="w-72 min-h-[26px] rounded-sm flex items-center pl-2 relative bg-black md:w-full md:min-h-[40px]">
      <Link
        to="/"
        className="text-white font-sans text-xs font-normal hover:underline md:text-lg"
      >
        Written on Thursday, 21st of January.
      </Link>
      <span className="absolute top-[3px] right-[3px] bg-white px-1 text-black rounded-sm font-normal text-[10px] md:text-base md:top-1 md:right-1">
        2021
      </span>
    </li>
  );
};
