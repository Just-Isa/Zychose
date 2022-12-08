/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        'street-menu-bg-gray' : '#5B6569',
        'active-block-turquoise' : '#95E8FF',
        'backfolder-gray' : '#424A4C',
        'street-menu-tile-bg-turquoise' : '#E4F9FF',
        'bulldozer-yellow' : '#FFD941',
        'bulldozer-gray' : '#4B5357',
      }
    },
  },
  plugins: [],
};
