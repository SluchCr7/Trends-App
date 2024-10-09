/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1400px",
    },
    fontFamily: {
      primary : "var(--font-jetBrainsMono)",
    },
    extend: {
      colors: {
        primary: "#014f86",
        secondary: "#621708",
        dark: "#000000",
        light: "#fff",
        accent: {
          DEFAULT: "#0e0d0b",
          ColorT: "#0e0d0c",
          hover: "#121111",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
