/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: '#3f51b5',
        customBlack: '#141414',
        customBackgroundBlack: '#1c1c1b',
      }
    },
  },
  plugins: [],
}
