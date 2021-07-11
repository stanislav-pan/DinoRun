module.exports = {
  purge: [
    "./src/client/components/**/*.{js,ts,jsx,tsx}",
    "./src/client/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#575A89",
        lightPrimary: "#5F64A7",
        feedback: "#C72424",
      },
    },
    fontFamily: {
      fontNunito: ["Nunito", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
