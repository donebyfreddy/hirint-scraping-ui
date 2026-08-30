import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          soft: "var(--primary-soft)",
          ring: "var(--primary-ring)",
        },
        success: { DEFAULT: "var(--success)", soft: "var(--success-soft)" },
        warning: { DEFAULT: "var(--warning)", soft: "var(--warning-soft)" },
        info: { DEFAULT: "var(--info)", soft: "var(--info-soft)" },
        danger: { DEFAULT: "var(--danger)", soft: "var(--danger-soft)" },
        teal: "var(--chart-teal)",
        cyan: "var(--chart-cyan)",
        pink: "var(--chart-pink)",
        lime: "var(--chart-lime)",
        term: { bg: "var(--term-bg)", text: "var(--term-text)" },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "16px",
        control: "10px",
        pill: "999px",
      },
      boxShadow: {
        subtle: "var(--shadow)",
      },
      keyframes: {
        fade: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
      animation: {
        fade: "fade .25s ease",
        blink: "blink 1.1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
