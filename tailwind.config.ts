import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0D0B",
          900: "#0E120F",
          800: "#141A17",
          700: "#1B231F",
          600: "#28322C",
          500: "#3A473F"
        },
        paper: {
          50: "#FAF8F3",
          100: "#EFEBE1",
          400: "#A3AE9F",
          600: "#6B7A71"
        },
        signal: {
          DEFAULT: "#22C58B",
          dim: "#0F9D6B",
          amber: "#D9A441",
          red: "#C6685A"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ['"Eyesome Script"', "cursive"]
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-14deg)" },
          "75%": { transform: "rotate(14deg)" }
        }
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out"
      }
    }
  },
  plugins: []
};

export default config;
