import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18201f",
        forest: "#1f4d43",
        moss: "#5d7b57",
        brass: "#b58a42",
        porcelain: "#f8f5ef",
        warm: "#efe5d4",
        coral: "#b9644b"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(24, 32, 31, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
