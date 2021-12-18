import type { LoaderFunction } from 'remix'
import { serveTailwindCss } from 'remix-tailwind'

export const loader: LoaderFunction = async () =>
  await serveTailwindCss('app/tailwind.css')
