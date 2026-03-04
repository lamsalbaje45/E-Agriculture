/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#FAFDF8",
          100: "#F0F7F2",
          200: "#E8F3EC",
          300: "#D0E8DE",
          400: "#4C9A6A",
          500: "#2F6F4F",
          600: "#24563D",
          700: "#1a3f2b",
          800: "#0f2819",
          900: "#051a10",
        },
        luxury: {
          "cream": "#F8F6F1",
          "gold": "#D4AF37",
          "dark-gold": "#B8860B",
          "deep-green": "#1B3D2F",
          "soft-taupe": "#E8DCCF",
        },
      },
      backgroundColor: {
        softBg: "#FAFDF8",
        softMint: "#F0F7F2",
        forestGreen: "#2F6F4F",
        leafGreen: "#4C9A6A",
        darkGreen: "#24563D",
        "luxury-cream": "#F8F6F1",
      },
      textColor: {
        forestGreen: "#2F6F4F",
        leafGreen: "#4C9A6A",
        darkGreen: "#24563D",
        "luxury-gold": "#D4AF37",
        slate: {
          600: "#2A3F3A",
          500: "#64748B",
        },
      },
      borderColor: {
        borderLight: "#E2E8F0",
        forestGreen: "#2F6F4F",
        "luxury-gold": "#D4AF37",
      },
      fontFamily: {
        sans: ["'Inter', 'system-ui', 'sans-serif'"],
        serif: ["'Playfair Display', 'serif'"],
      },
      boxShadow: {
        "luxury": "0 20px 25px -5px rgba(47, 111, 79, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "luxury-lg": "0 25px 50px -12px rgba(47, 111, 79, 0.15)",
      },
    },
  },
  plugins: [],
}
