/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        'street-menu-bg-gray' : '#5b6569',
        'active-block-turquoise' : '#95E8FF',
        'back-folder-gray' : '#424A4C',
        'street-menu-tile-bg-turquoise' : '#E4F9FF',
        'bulldozer-yellow' : '#FFD941',
        'bulldozer-gray' : '#4B5357',
      }
    },
  },
  plugins: [],
};
