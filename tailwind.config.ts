import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "teal" now drives the primary near-black brand color (buttons, active states)
        teal: {
          DEFAULT: "#141414",
          dark: "#000000",
          light: "#2A2A2A",
        },
        // "amber" drives the gold accent throughout
        amber: {
          DEFAULT: "#F5A623",
          dark: "#D98E10",
          light: "#FDECC8",
        },
        ink: "#141414",
        paper: "#FFFFFF",
        line: "#EAEAEA",
        muted: "#6B7280",
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
