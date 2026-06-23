import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1d1b18',
        bone: '#f5f0e8',
        clay: '#b66f4f',
        moss: '#66715f',
        linen: '#fbf8f2'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
