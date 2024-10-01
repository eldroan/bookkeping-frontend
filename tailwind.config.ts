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
        background: "#FAF9F2",
        dialog_background: "#DFDDD3",
        dialog_text: "#706D5C",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
