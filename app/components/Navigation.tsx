import * as React from 'react'
import { NavLink as RemixNavLink } from 'remix'

const NavLink: React.FC<{ to: string }> = ({ to, children }) => (
  <RemixNavLink
    className={({ isActive }) =>
      isActive
        ? 'font-serif font-bold text-black text-lg underline md:text-2xl'
        : 'font-serif font-normal text-black text-lg md:text-2xl hover:underline'
    }
    to={to}
    prefetch="intent"
  >
    {children}
  </RemixNavLink>
)

export const Navigation = () => {
  return (
    <nav className="min-h-[64px] w-full flex justify-between items-center px-5 md:min-h-[96px] md:px-24 md:w-4/5 lg:w-3/5 xl:w-2/5">
      <NavLink to="/assessments/daily">Daily</NavLink>
      <NavLink to="/assessments/weekly">Weekly</NavLink>
      <NavLink to="/assessments/monthly">Monthly</NavLink>
    </nav>
  )
}
