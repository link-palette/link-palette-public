import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0",
        desktop: "2rem",
      },
      screens: {
        desktop: { min: "1280px" },
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        typing: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blinkCaret: {
          "0%": { opacity: "1" },
          " 100%": { opacity: "0" },
        },
        deleting: {
          from: { width: "100%" },
          to: { width: "0" },
        },
        newTyping: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 0.5s ease-out forwards ",
        blinkCaret: "blinkCaret 1s linear infinite", // 지속 시간과 애니메이션 타이밍 함수 조정
        deleting: "deleting 2.5s steps(30, end) forwards",
        newTyping: "newTyping 5s steps(30, end) forwards",
      },
      screens: {
        mobile: { max: "767px" },
        desktop: { min: "768px" },
      },
      colors: {
        primary: colors.neutral,
        secondary: "#D9D9D9",
        error: colors.red,
      },
      fontFamily: {
        pretendardblack: ["PretendardBlack"],
        pretendardSemiBold: ["pretendardSemiBold"],
        PretendardMedium: ["PretendardMedium"],
      },
      backgroundImage: {
        "gradient-to-b": "linear-gradient(to bottom, #02E965, #03B765)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
