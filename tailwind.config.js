/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'norfolk-green': '#4A5D4F',
        'norfolk-sand': '#F2F0E9',
        'norfolk-clay': '#A68A7C',
        'norfolk-ocean': '#6B8E9B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}