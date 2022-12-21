/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./themes/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        gentium: ['Gentium Plus'],
        mono: ['JetBrains Mono']
      },
    },
  },
  plugins: [],
}