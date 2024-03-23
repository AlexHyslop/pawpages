/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#022F40',
        'secondary': '#38AECC',
        'third': '#0090C1',
        'fourth': '#C4C5BA'
      }
    },
  },
  plugins: [
  ],
}

