/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        sidebar: {
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        sidebar: "sidebar 1s ease-in-out forwards",
      },
      gridTemplateColumns: {
        "1fr-4fr": "1fr 4fr",
        "2fr-3fr": "2fr 3fr",
      },
    },
  },
  plugins: [],
};
