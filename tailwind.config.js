/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./views/**/*.handlebars', './public/**/*.{js,css,html}'],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
        'light-blue': '#85d7ff',
        cyan: '#79ffe1',
      },
    },
  },
  plugins: [],
};
