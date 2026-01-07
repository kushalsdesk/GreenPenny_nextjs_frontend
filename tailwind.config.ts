import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
