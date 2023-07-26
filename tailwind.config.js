export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 500ms linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      colors: {
        primary: '#ff8b14',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        5: '5px',
      },
      minWidth: {
        40: '10rem',
        52: '13rem',
      },
      maxWidth: {
        80: '20rem',
      },
      outlineWidth: {
        6: '6px',
      },
      lineHeight: {
        5.5: '1.375rem',
      },
      screens: {
        xs: '450px',
        'sm/md': '680px',
        'lg/xl': '1140px',
        '3xl': '1650px',
        '4xl': '1700px',
      },
    },
  },
};
