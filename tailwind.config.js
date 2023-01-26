/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        footer: {
          bg: "#E8E8E8",
        },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: "#303844",
          },
          "h1,h2,h3,h4,h5,h6": {
            color: "#2D3748",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
