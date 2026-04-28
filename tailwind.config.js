/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ffa6",
        secondary: "#ff3b3b",
        darkbg: "#0b0b0b",
        cardbg: "#151515",
      }
    },
  },
  plugins: [],
}