/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F359B",
        border: "#D8D9DD",
        title: "#26303E",
        subtitle: "#5C6672",
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"]
    }
  },
  plugins: [],
}

