/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "inactive-folder-gray": "#424A4C !important",
        "street-menu-bg-gray": "#5B6569",
        "active-block-turquoise": "#95E8FF",
        "street-menu-tile-bg-turquoise": "#E4F9FF",
      },
    },
  },
  plugins: [],
};
