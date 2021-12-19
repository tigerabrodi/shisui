import * as React from 'react'
import { Link } from 'remix'
import { BackIcon } from '~/icons/Back'

export const BackLink: React.FC<{ to: string; ariaLabel: string }> = ({
  to,
  ariaLabel,
}) => {
  return (
    <Link
      to={to}
      prefetch="intent"
      aria-label={ariaLabel}
      className="bg-black flex-center absolute top-[7px] -left-1.5 rounded-full transition-all w-6 h-6 shadow-sm shadow-black md:w-10 md:h-10 md:top-4 md:-left-2"
    >
      <BackIcon className="w-[18px] h-[18px] md:w-7 md:h-7" />
    </Link>
  )
}
