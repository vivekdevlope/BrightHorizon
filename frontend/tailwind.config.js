module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

theme: {
  extend: {
    animation: {
      "fade-in": "fadeIn 0.2s ease-out",
      "slide-down": "slideDown 0.2s ease-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0", transform: "translateY(-4px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
  },
}