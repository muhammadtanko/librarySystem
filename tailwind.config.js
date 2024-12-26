const colors = require('tailwindcss/colors')
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      "bgDArk": "#1F2A40",
      gray: colors.gray,
      red: colors.red,
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

