/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "street-menu-bg-gray": "#5B6569",
        "active-block-turquoise": "#95E8FF",
        "inactive-folder-gray": "#424A4C",
        "street-menu-tile-bg-turquoise": "#E4F9FF",
        "bulldozer-yellow": "#FFD941",
        "bulldozer-gray": "#4B5357",
      },

      backgroundImage: {
        "bulldozer-active" : "url('/src/assets/img/bulldozer-white.svg') !important",
        "bulldozer-inactive" : "url('/src/assets/img/bulldozer-grey.svg') !important",
      },

      backgroundSize: {
        "65%" : "65%"
      }
    },
  },
  plugins: [],
};
