/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#77db72",

          secondary: "#4863a8",

          accent: "#fceca6",

          neutral: "#23212C",

          "base-100": "#FAFAFA",

          info: "#87CEE8",

          success: "#156A60",

          warning: "#D89D13",

          error: "#DF496C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
