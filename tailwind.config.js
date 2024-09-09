/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: '30px'
    },
    extend: {},
  },
  plugins: [
  require('flowbite/plugin'),
  flowbite.plugin(),
  ],
}

