/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FDFCFA',
          alt: '#F5F3EF',
        },
        text: {
          DEFAULT: '#2D2A26',
          muted: '#6B6560',
        },
        accent: {
          DEFAULT: '#C4653A',
          dark: '#A8532E',
          light: '#F0DDD4',
        },
        border: '#E8E4DF',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Inter Variable"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        image: '16px',
      },
    },
  },
  plugins: [],
};
