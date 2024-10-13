/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'steel-blue': {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe7',
          300: '#a7bdd2',
          400: '#779ab9',
          500: '#5981a6',
          600: '#436486',
          700: '#37516d',
          800: '#31455b',
          900: '#2c3b4e',
          950: '#1d2734'
        },
        apple: {
          50: '#f1f8ed',
          100: '#dfefd8',
          200: '#c0e1b5',
          300: '#98ce88',
          400: '#64b04f',
          500: '#569d45',
          600: '#407d33',
          700: '#34602b',
          800: '#2c4e26',
          900: '#284324',
          950: '#11240f'
        }
      }
    }
  },
  plugins: []
};
