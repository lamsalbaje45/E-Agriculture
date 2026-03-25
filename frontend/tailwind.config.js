/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#f6f1df",
        moss: "#2f6b3d",
        clay: "#8b5a2b",
        bark: "#3f3427",
        leaf: "#8fbf5a",
        wheat: "#d8b868",
        fern: "#4f8a41"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Trebuchet MS", "sans-serif"]
      },
      boxShadow: {
        panel: "0 20px 60px rgba(52, 71, 35, 0.18)"
      }
    }
  },
  plugins: []
};
