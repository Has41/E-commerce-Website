/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'mont': ['Montserrat', 'sans-serif']
      },
      screens: {
        'sm': {'min': '560px', 'max': '640px'}
      },
      keyframes: {
        'ping-slow': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
      animation: {
        'ping-slow': 'ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
