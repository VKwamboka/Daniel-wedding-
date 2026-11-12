/** Design tokens — change the palette here and the whole site follows. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#FBF8F2', deep: '#F4EEE3' },
        lavender: { 50: '#F8F4FC', 100: '#F0E8F8', 200: '#E3D5F1', 300: '#CDB6E4', 400: '#B394D3' },
        lilac: { DEFAULT: '#C3A0CF', deep: '#9B72AE' },
        plum: { 500: '#7A4A84', 700: '#5A2E63', 800: '#45224D', 900: '#2F1736' },
        gold: { soft: '#CDB386', DEFAULT: '#B4955E' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(90, 46, 99, 0.25)',
        seal: 'inset 0 -6px 12px rgba(0,0,0,.12), inset 0 6px 10px rgba(255,255,255,.6), 0 8px 18px rgba(90,46,99,.35)',
      },
    },
  },
  plugins: [],
};
