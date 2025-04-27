/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This enables dark mode based on a class on the HTML element
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], 
}
