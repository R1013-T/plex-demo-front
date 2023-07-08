/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bk': '#333333',
        'wh': '#C1C2C5',
        'brand-primary': '#5F7ADB',
        'brand-secondary': '#A2B2EE',
        'bg-light-primary': '#FFF',
        'bg-light-secondary': '#F7F7F7',
        'bg-dark-primary': '#26292B',
        'bg-dark-secondary': '#2E3239',
      },
      height: {
        'screen-main': 'calc(100dvh - 28px)',
        'screen-main-inner': 'calc(100dvh - 28px - 50px)',
      },
      width: {
        'screen-main': 'calc(100dvw - 80px)',
        'screen-main-inner': 'calc(100dvw - 80px - 32px)',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
