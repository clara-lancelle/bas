/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '22': '22%',
      },
      lineHeight: {
        '110': '110%',
      },
      margin: {
        '18': '4.5rem',
      },
      padding: {
        '15': '3.75rem',
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}

