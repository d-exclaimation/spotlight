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
        primary2: "#4353b5",
        text: "#f0f7f8",
        // text: "#010404",
        background: "#010404",
        // background: "#f0f7f8",
        primary: "#b2bdf8",
        // primary: "#4353e5",
        secondary: "#050824",
        // secondary: "0xFAF7DB",
        accent: "#4353e5",
        // accent: "#b2bdf8",
      },
      animation: {
        content: "content 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        "slide-up":
          "slide-up 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-down":
          "slide-down 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-right":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "expand-right":
          "expand-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "expand-y":
          "expand-y 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "bounce-r": "bounce-r 1s infinite",
        "heavy-bounce": "heavy-bounce 1s infinite",
        "up-down": "up-down 1s infinite",
      },
      keyframes: {
        content: {
          from: { opacity: 0, transform: "translateY(2.5rem)" },
          to: { opacity: 1, transform: "translate(0)" },
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
        "expand-y": {
          "0%": {
            height: 0,
          },
        },
        "bounce-r": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "heavy-bounce": {
          "0%, 100%": {
            transform: "translateY(-100%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "up-down": {
          "0%, 100%": {
            transform: "translateY(-0.125rem)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0.125rem)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
