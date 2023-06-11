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
        // 'text': '#f6fefd',
        // 'background': '#010404',
        // 'primary-button': '#b2bdf8',
        // 'secondary-button': '#050824',
        // 'accent': '#4353e5',
      },
      animation: {
        overlay: "overlay 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        content: "content 300ms cubic-bezier(0.16, 1, 0.3, 1)",
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
        overlay: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        content: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
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
