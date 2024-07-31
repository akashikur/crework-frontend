import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
        "add-gradient":
          "linear-gradient(to top, #3a3a3a, #333333, #2d2d2d, #262626, #202020)",
      },
      colors: {
        customPurple: "rgba(69, 52, 172, 1)",
      },
      boxShadow: {
        "custom-outer": "0px 4px 16px 0px rgba(0, 0, 0, 0.1)",
        "custom-inner": "inset 0px 12px 16px 0px rgba(186, 186, 186, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
