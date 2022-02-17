module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'header-blue': '#8be0ff',
      'header-pink': '#ff8bb6',
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      sansSerif: ['Laila', 'sans-serif'],
      roboto: ['roboto', 'sans-serif'],
    },
    borderWidth: {
      2: '2px',
      3: '3px',
    },
    screens: {
      xs: '352px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'hero-flowers': "url('./images/welcome.jpg')",
      },
      translate: {
        38: '9.5rem',
        42: '10.5rem',
        47: '11.75rem',
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
