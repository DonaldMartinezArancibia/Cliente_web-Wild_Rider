/** @type {import('tailwindcss').Config} */
module.exports = {
  // Un único glob sobre src/: los globs anteriores sólo cubrían pages,
  // components y templates, así que las clases de hooks/, lib/ o context/
  // quedaban fuera del CSS generado.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        footer: {
          bg: "#E8E8E8",
        },
        // Colores de marca. Antes se repetían como valores arbitrarios
        // (bg-[#0833a2], bg-[#F6CC4D]) por toda la interfaz.
        brand: {
          blue: "#0833a2",
          yellow: "#F6CC4D",
          "yellow-light": "#ffda6b",
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "#303844",
          },
          "h1,h2,h3,h4,h5,h6": {
            color: "#2D3748",
          },
        },
      }),
      fontFamily: {
        CarterOne: "Carter One",
        Inter: "Inter",
        Poppins: "Poppins",
        Montserrat: "Montserrat",
        InterTight: "Inter Tight",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://media.graphassets.com/03XpBnUfS0f4Z3AE9i5Q')",
      },
      keyframes: {
        textScroll: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-100%, 0, 0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
