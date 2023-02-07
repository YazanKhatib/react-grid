/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dustyBlue: '#406882',
        dustyGray: '#CDCED8',
        lightDustyGray: '#ECEDF3',
      },
      fontFamily: {
        assistant: ['Assistant'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
