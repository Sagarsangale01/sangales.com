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
        navy: {
          DEFAULT: "#142735",
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#627d98",
          500: "#486581",
          600: "#334e68",
          700: "#243b53",
          800: "#142735",
          900: "#0b1720",
          950: "#060d13",
        },
        gold: {
          DEFAULT: "#C6A66B",
          50: "#faf7f0",
          100: "#f3ede0",
          200: "#e7d9be",
          300: "#dbc59c",
          400: "#cfb27a",
          500: "#C6A66B",
          600: "#b39152",
          700: "#96753c",
          800: "#7b5e31",
          900: "#654c29",
        },
        offwhite: {
          DEFAULT: "#F7F6F2",
          100: "#FAF9F6",
          200: "#F7F6F2",
          300: "#ECEAE3",
          400: "#DFDCD3",
        },
        charcoal: {
          DEFAULT: "#242B30",
          50: "#718096",
          100: "#4A5568",
          200: "#2D3748",
          300: "#242B30",
          400: "#1A202C",
        },
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "Manrope", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        superwide: "0.28em",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(20, 39, 53, 0.08)",
        "editorial-hover": "0 30px 60px -15px rgba(20, 39, 53, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;

