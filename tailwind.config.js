/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      fontSize: {
         sm: "12px",
         base: "14px",
         xl: "16px",
         "2xl": "20px",
         "3xl": "28px",
         "4xl": "38px",
         "5xl": "50px",
      },

      extend: {
         borderWidth: {
            1: "1px",
         },
         colors: {
            white: "#FFFFFF",
            black: "#242424",
            grey: "#F3F3F3",
            "dark-gray": "#6B6B6B",
            red: "#FF4E4E",
            transparent: "transparent",
            twitter: "#1DA1F2",
            purple: "#8B46FF",
         },
         fontFamily: {
            primary: ["'Inter'", "sans-serif"],
            secondary: ["'Gelasio'", "serif"],
         },
      },
   },
   plugins: [],
};
