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
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      sansSerif: ['Laila', 'sans-serif'],
    },
    borderWidth: {
      2: '2px',
      3: '3px',
    },
    extend: {
      backgroundImage: {
        'hero-flowers': "url('./images/welcome.jpg')",
      },
      translate: {
        58: '14.5rem',
        61: '15.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ],
};
