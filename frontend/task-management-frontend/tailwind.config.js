/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        base: {
          DEFAULT: '#D4F49C',
          400: '#9CCC4A',
          300: '#C1ED76',
          200: '#E5FAC3',
          100: '#F5FEE7',
        },
        gray: {
          DEFAULT: '#484844',
          400: '#18180E',
          300: '#11110F',
          200: '#7D7D76',
          100: '#AFAFA5',
        },
        neutralGray: {
          DEFAULT: '#FBFAFA',
          300: '#ede8e8',
          200: '#A59E9E',
          100: '#CDCACA',
        },
        accentColor: {
          DEFAULT: '#DC5A50',
          400: '#DC5A50',
          300: '#FFAAA3',
          200: '#FFCBC7',
          100: '#FFEAE8',
        },
        background: '#FBFAFA'
      },
    },
  },
  plugins: [],
};
