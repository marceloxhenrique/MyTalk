/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--clr-primary)",
        primaryColorlt: "var(--clr-primary-lt)",

        secondaryColor: "var(--clr-secondary)",
        secondaryColorLt: "var(--clr-secondary-lt)",

        primaryTextColor: "var(--clr-primary-text)",
        secondaryTextColor: "var(--clr-secondary-text)",

        backgroundMessageReceived: "var(--background-message-received)",
      },
    },
  },
  plugins: [],
};
