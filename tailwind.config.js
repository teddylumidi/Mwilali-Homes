
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1a202c', // Darker slate for premium feel
        secondary: '#4a5568',
        accent: '#c05621', // Burnt orange/Gold tone for luxury accent
        cream: '#fdfbf7',
      }
    },
  },
  plugins: [],
}