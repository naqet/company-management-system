/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"],
      },
      screens: {
        "4xl": "1920px",
      },
      keyframes: {
        hide: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        hide: "hide 600ms linear forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
