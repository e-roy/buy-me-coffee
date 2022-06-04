module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "3/4": "75vh",
        "1/10": "10vh",
        "2/10": "20vh",
        "3/10": "30vh",
        "4/10": "40vh",
        "5/10": "50vh",
        "6/10": "60vh",
        "7/10": "70vh",
        "8/10": "80vh",
        "9/10": "90vh",
      },
      colors: {
        coffee: {
          50: "#FDFCFA",
          100: "#F6F2EC",
          200: "#E9E0D0",
          300: "#DCCEB5",
          400: "#CFBB99",
          500: "#C2A97D",
          600: "#B09057",
          700: "#8D7242",
          800: "#675330",
          900: "#40341E",
        },
      },
    },
  },
  plugins: [],
};
