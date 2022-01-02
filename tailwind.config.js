module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    colors: {
      'header-blue': '#8be0ff',
      'header-pink': '#ff8bb6',
    },
    fontFamily: {
      sansSerif: ['Laila', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
