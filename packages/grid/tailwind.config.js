/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dustyLightBlue: '#B1D0E0',
        dustyBlue: '#406882',
        darkBlue: '#1A374D',
        dustyGray: '#CDCED8',
        eggshellWhite: '#F6F4F5',
        lightDustyGray: '#ECEDF3',
        dustyGreenBlue: '#6998AB',
        darkBlueBrown: '#272034',
        darkBlueBrownHover: '#393049',
      },
      fontFamily: {
        assistant: ['Assistant'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
