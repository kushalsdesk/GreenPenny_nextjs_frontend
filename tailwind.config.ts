import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        green: {
          50: "oklch(0.97 0.01 142)",
        },
        slate: {
          50: "oklch(0.98 0.005 240)",
        },
      },
      keyframes: {
        floatCurrency: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -15px) rotate(2deg)" },
          "50%": { transform: "translate(-10px, 5px) rotate(-1deg)" },
          "75%": { transform: "translate(5px, 10px) rotate(1deg)" },
        },
      },
      animation: {
        floatCurrency: "floatCurrency 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
