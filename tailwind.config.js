/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ["Virgil"],
        raleway: ["Raleway"],
        inter: ["Inter"],
      },
      colors: {
        text: "#000000",
        background: "#ffffff",
        primary: "#8fb4ff",
        secondary: "#ebf1ff",
        accent: "#ff8f94",
      },
      animation: {
        "slide-up":
          "slide-up 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-down":
          "slide-down 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-right":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "expand-right":
          "expand-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "slide-left": {
          "0%": {
            transform: "translateX(-50%)",
            opacity: 0,
          },
          "80%": {
            transform: "translateX(1%)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "expand-right": {
          "0%": {
            width: 0,
          },
          "100%": {
            width: "100%",
          },
        },
      },
    },
  },
  plugins: [],
};
