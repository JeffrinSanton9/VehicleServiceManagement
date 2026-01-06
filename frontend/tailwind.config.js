import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira: ["Fira Code", "monospace"],
      },
      colors: {
        indigo: colors.indigo,
        pink: colors.pink,
        yellow: colors.yellow,
        green: colors.green,
        blue: colors.blue,
        purple: colors.purple,
        gray: colors.gray,
        white: colors.white,
      },
    },
  },
  plugins: [],
};
