/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FF9900', // Amazon Orange
          600: '#e88b00', // Slightly darker for hover
        },
      },
    },
  },
  plugins: [],
};