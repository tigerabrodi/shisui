// @ts-nocheck
/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: `'Lato', sans-serif`,
      serif: `'Merriweather', serif`,
    },
    extend: {
      colors: {
        white: "#EBE1E1",
        black: "#282424",
      },
    },
  },
};
