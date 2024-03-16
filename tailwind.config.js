/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B1B1B',
        'secondary': '#595f39',
        'third': '#E4E4DE',
        'fourth': '#C4C5BA'
      }
    },
  },
  plugins: [],
}

