/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      gridTemplateColumns: {
        sidebar: "90px 1fr",
      },
      gridTemplateRows: {
        mobile: "auto 1fr auto",
        desktop: "1fr auto",
      },
      keyframes: {
        "bounce-reverse": {
          "0%, 100%": {
            transform: "translateY(25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        "bounce-reverse": "bounce-reverse 1s infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
    },
  ],
};
