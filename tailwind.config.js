/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: "#050A30",
      warning: "#F8D210",
      danger: "#F51720",
      info: "#7EC8E3",
      success: "#18A558",
    },
  },
  plugins: [],
});
