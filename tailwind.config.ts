import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { 50:"#fbfbf7", 100:"#f7f6ef", 200:"#efeddc" },
        ink: { 900:"#141414", 700:"#2b2b2b" },
        stoney: { 50:"#f7f7f6", 100:"#efefed", 200:"#e4e4e1", 300:"#d6d6d2", 600:"#6b6b66" },
        accent: { 700:"#5b21b6", 600:"#6d28d9" },
        aurora: { 700:"#275e5b" },
      },
      boxShadow: {
        soft:"0 12px 34px rgba(0,0,0,0.10)",
        player:"0 -12px 30px rgba(0,0,0,0.10)",
      },
      borderRadius: { xl2:"1.25rem" },
    },
  },
  plugins: [],
} satisfies Config;
