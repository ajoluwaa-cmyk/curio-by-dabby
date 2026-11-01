import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Curio By Dabby Colour System
        plum: {
          DEFAULT: "#54263F",
          50: "#f9f5f7",
          100: "#f3ebef",
          200: "#e6d6de",
          300: "#d4b5c3",
          400: "#b98aa0",
          500: "#9d6a82",
          600: "#825468",
          700: "#6b4555",
          800: "#54263F", // Primary Deep Plum
          900: "#4a2238",
        },
        champagne: {
          DEFAULT: "#D8BFA3",
          50: "#faf7f3",
          100: "#f5efe6",
          200: "#eadcc9",
          300: "#D8BFA3", // Primary Champagne Beige
          400: "#c9a882",
          500: "#b89065",
          600: "#a67a53",
          700: "#8a6345",
          800: "#71523c",
          900: "#5d4433",
        },
        ivory: {
          DEFAULT: "#FAF6F0",
          50: "#FAF6F0",
          100: "#f5f0e8",
          200: "#ebe3d6",
        },
        taupe: {
          DEFAULT: "#A89483",
          50: "#f7f5f3",
          100: "#efebe7",
          200: "#ddd5cc",
          300: "#c7b9ab",
          400: "#A89483", // Soft Taupe
          500: "#947d6a",
          600: "#7f6858",
          700: "#68564a",
          800: "#57493f",
          900: "#493e37",
        },
        charcoal: {
          DEFAULT: "#292526",
          50: "#f6f5f5",
          100: "#e7e6e6",
          200: "#d1d0d0",
          300: "#b0aeae",
          400: "#888485",
          500: "#6d696a",
          600: "#5c5859",
          700: "#4e4b4c",
          800: "#444142",
          900: "#292526", // Primary Charcoal
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(84, 38, 63, 0.08)",
        elegant: "0 10px 40px -10px rgba(84, 38, 63, 0.15)",
        glow: "0 0 40px rgba(216, 191, 163, 0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
