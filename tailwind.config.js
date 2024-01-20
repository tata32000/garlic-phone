/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage : {
        'garlic' : "url('./src/assets/garlic.png')",
    },
  },
  plugins: [],
}
