/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: '#2C3E50',
        secondary: '#E67E22',
        accent: '#3498DB',
      },
    },
  },
  plugins: [],
} 