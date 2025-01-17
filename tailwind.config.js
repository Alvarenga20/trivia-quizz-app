export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-quiz":
          "linear-gradient(to bottom right, #3b82f6, #6366f1, #9333ea)",
      },
      animation: {
        "float-random": "floatRandom 5s ease-in-out infinite",
        "bounce-bounded": "bounce-bounded 1s infinite",
      },
      keyframes: {
        floatRandom: {
          "0%": {
            transform: "translateY(0) translateX(0)",
            opacity: 0.8,
          },
          "50%": {
            transform: "translateY(-50px) translateX(30px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(0) translateX(0)",
            opacity: 0.8,
          },
        },
        "bounce-bounded": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
      },
    },
  },
  plugins: [],
};
