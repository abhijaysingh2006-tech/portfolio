import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FFFFFF",
          dark: "#05070B",
        },
        navy: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#B8D3FF",
          500: "#1E6BFF",
          800: "#0D214D",
          900: "#0A1630",
          950: "#050B17",
        },
        electric: {
          blue: "#1E6BFF",
          cyan: "#38D6FF",
          sky: "#7ADFFF",
        },
        sakura: {
          pink: "#FF8FB8",
          blush: "#FFE6EE",
        },
        ink: {
          light: "#0A1630",
          dark: "#F0F4FC",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "blue-mesh": "radial-gradient(at 0% 0%, #EAF3FF 0px, transparent 50%), radial-gradient(at 100% 0%, #CFE4FF 0px, transparent 50%), radial-gradient(at 100% 100%, #EAF3FF 0px, transparent 50%), radial-gradient(at 0% 100%, #CFE4FF 0px, transparent 50%)",
        "dark-mesh": "radial-gradient(at 0% 0%, #09152C 0px, transparent 50%), radial-gradient(at 100% 100%, #081124 0px, transparent 50%)",
      },
      boxShadow: {
        "electric": "0 0 25px -5px rgba(30, 107, 255, 0.4)",
        "electric-cyan": "0 0 25px -5px rgba(56, 214, 255, 0.45)",
        "sakura": "0 0 20px -3px rgba(255, 143, 184, 0.35)",
        "manga": "4px 4px 0px 0px rgba(10, 22, 48, 1)",
        "manga-dark": "4px 4px 0px 0px rgba(56, 214, 255, 0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "speedline": "speedline 0.8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        speedline: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
