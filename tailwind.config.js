/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1A1A2E",
        "secondary-dark": "#16213E",
        "accent-dark": "#F56D6D",
        "font-dark": "#171717",
        "primary-light": "#EDEDED",
        "secondary-light": "#C5C5C5",
        "accent-light": "#910025",
        "font-light": "#FFFFFF",
      },
      fontSize: {
        heading: [
          "1.625rem",
          {
            lineHeight: "1.625rem",
            fontWeight: "400",
          },
        ],
      },
      boxShadow: {
        button: "inset 0 0 20px rgba(0, 0, 0, 0.3)",
      },
    },
    fontFamily: {
      primary: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      secondary: [
        "Space Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "3rem",
      },
    },
  },
  plugins: [],
};
