import * as React from "react";
import { NavLink as RemixNavLink } from "remix";

type Props = {
  to: string;
};

const NavLink: React.FC<Props> = ({ to, children }) => (
  <RemixNavLink
    className={({ isActive }) =>
      isActive
        ? "font-serif font-bold text-black text-lg underline md:text-2xl"
        : "font-serif font-normal text-black text-lg md:text-2xl hover:underline"
    }
    to={to}
  >
    {children}
  </RemixNavLink>
);

export const Navigation = () => {
  return (
    <nav className="h-16 w-full flex justify-between items-center px-5 md:px-24 md:w-4/5 lg:w-3/5 xl:w-2/5">
      <NavLink to="/assessments/daily">Daily</NavLink>
      <NavLink to="/assessments/weekly">Weekly</NavLink>
      <NavLink to="/assessments/monthly">Monthly</NavLink>
    </nav>
  );
};