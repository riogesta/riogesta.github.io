/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./themes/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        "noto-serif": ['Noto Serif'],
        mono: ['JetBrains Mono']
      },
    },
  },
  plugins: [],
}