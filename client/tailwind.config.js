/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "1fr-4fr": "1fr 4fr",
        "2fr-3fr": "2fr 3fr",
      },
    },
  },
  plugins: [],
};
