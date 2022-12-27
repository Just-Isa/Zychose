/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans"],
      },
      colors: {
        "button-blue-bright": "#00C8FF",
        "button-green": "#34D95A",
        "back-folder-gray": "#424A4C",
        "room-list-bg-gray": "#6E787B",
      },
    },
  },
  plugins: [],
};
