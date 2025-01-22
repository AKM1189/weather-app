/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f1f5f9",
        primary: "#ff4500",
        secondary: "#ffd700",
        font: "#475569",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
