/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 24px 60px -32px rgba(15, 23, 42, 0.28)',
      },
    },
  },
  plugins: [],
}
