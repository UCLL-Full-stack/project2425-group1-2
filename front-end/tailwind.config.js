/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#776E87",
        secondary: "#4D4861",
        success: "#DE9151",
        danger: "#E00049",
        safe: "#49B540",
        alter: "#C251DE",
      },
      boxShadow: {
        regular: "1px 2px 2px rgba(0, 0, 0, 0.8)",
        button_pressed: "inset 1px 2px 4px rgba(0, 0, 0, 0.8)"
      },
      spacing: {
        112: "28rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
