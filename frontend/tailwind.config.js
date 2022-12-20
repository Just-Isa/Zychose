/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans"],
    },
    extend: {
      colors: {
        "blue-custom": "#00C8FF",
        "green-custom": "#34D95A",
        background: "#424A4C",
        "light-gray-custom": "#6E787B",
      },
    },
  },
  plugins: [],
};
