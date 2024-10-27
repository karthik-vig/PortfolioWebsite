import Animations from './additional_configs/tailwind/animations.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...Animations,
      // fontFamily: {
      //   pacifico: ["Pacifico", "sans-serif"]
      // },
    },
  },
  plugins: [],
}

