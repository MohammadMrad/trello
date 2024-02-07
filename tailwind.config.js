/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "border-color": "#dfe1e6",
        "bg-input": "#fafbfc",
        "bg-hover-input": "#eceaea",
        "bg-btn": "#0052cc",
        outline: "#63a1f1",
        "btn-hover": "#1766dd",
        "fa-color": "#172b4d",
        "bg-list": "#ebecf0",
      },
      height: {
        "94vh": "94vh",
        "6vh": "6vh",
      },
      maxWidth: {
        "23.5rem": "23.5rem",
      },
      keyframes: {
        rectangleOne: {
          "0%": {
            height: " 0.8rem",
          },
          "100%": {
            height: "0.25rem",
          },
        },
        rectangleTwo: {
          "0%": {
            height: "0.25rem",
          },
          "100%": {
            height: "0.8rem",
          },
        },
      },
    },
  },
  plugins: [],
}
