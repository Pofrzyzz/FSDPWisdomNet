/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        pbanking_hover: '#92796D',
        pbanking: '#6A584F'
      },
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

