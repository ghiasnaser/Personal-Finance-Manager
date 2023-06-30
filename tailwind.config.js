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
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'open-menu': 'open-menu .2s ease-in',
      },
    },
  },
  plugins: [],
};
