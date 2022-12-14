/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "grid-bg": "green",
      },
    },
  },
  plugins: [],
};
