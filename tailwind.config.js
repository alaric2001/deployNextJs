/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
    './node_modules/flowbite/dist/datepicker.js',
  ],
  plugins: [require('flowbite/plugin'), 'babel-plugin-styled-components'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Avenir Book', 'Inter', ...fontFamily.sans],
        avenir: {
          DEFAULT: ['Avenir Book', ...fontFamily.sans],
          book: ['Avenir Book', ...fontFamily.sans],
        },
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#00A3FF',
        bgdashboard: '#EFF5FF',
        btn: {
          primary: '#00A3FF',
          secondary: '#D7D7D7',
        },
        // primary: {
        //   // Customize it on globals.css :root
        //   50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
        //   100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
        //   200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
        //   300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
        //   400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
        //   500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
        //   600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
        //   700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
        //   800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
        //   900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        //   green: '#2FCC71',
        // }
        'light-green': {
          DEFAULT: '#EAFAF1',
          bold: '#cff7e0',
        },
        dark: {
          DEFAULT: '#1E1E2D',
          active: '#0E0E1B',
          navbar: '#0E0E1B',
          coin: '#262D33',
        },
        'light-gray': {
          DEFAULT: '#FBFBFD',
        },
        'menu-gray': '#F2F3F5',
        'lighter-gray': '#F1F1F1',
        gray: {
          navbar: '#9C9FA2',
          username: '#B7B7B7',
          mark_notification: '#979797',
          message_notification: '#48494F',
          comment_notification: '#DDDEE1',
          task: '#F2F2F4',
          progress: '#F0F1F1',
          recommend_task: '#BEBEBE',
          border: '#D9D9D9',
        },
        blue: {
          DEFAULT: '#2294E7',
        },
        'coin-yellow': '#FFCC4D38',
        danger: '#DB6C66',
      },
      opacity: {
        15: '.15',
        35: '.35',
        58: '.58',
      },
      boxShadow: {
        card: '0px 20px 60px rgba(129, 130, 129, 0.24)',
      },
      borderRadius: {
        card: '28px',
        menu: '18px',
      },
      padding: {
        card: '68px',
      },
      spacing: {
        72: '60rem',
        84: '21rem',
        96: '24rem',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
