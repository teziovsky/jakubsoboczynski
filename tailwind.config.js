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
      minHeight: {
        "inner-screen": "calc(100vh - 270px)",
        "inner-screen-lg": "calc(100vh - 205px)",
      },
      inset: {
        logo: "clamp(0.9375rem, 0.50304867rem + 1.853659vw, 2.125rem)",
        error: "calc(50% + 100px)",
        "error-lg": "calc(50% + 80px)",
      },
      width: {
        logo: "clamp(4.375rem, 3.68902445rem + 2.926829vw, 6.25rem)",
      },
      maxWidth: {
        "about-me-image": "clamp(12.5rem, 11.35670727rem + 4.878049vw, 15.625rem)",
      },
      padding: {
        contact: "100px 0 clamp(3.75rem, 2.83536586rem + 3.902439vw, 6.25rem)",
        "project-info":
          "clamp(0.625rem, 0.16768281rem + 1.95122vw, 1.875rem) clamp(1.25rem, 0.79268281rem + 1.95122vw, 2.5rem)",
      },
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
        button: [
          "clamp(0.75rem, 0.65853656rem + 0.390244vw, 1rem)",
          {
            lineHeight: "clamp(0.75rem, 0.65853656rem + 0.390244vw, 1rem)",
            fontWeight: "400",
          },
        ],
        "button-span": [
          "clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem)",
          {
            lineHeight: "clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem)",
            fontWeight: "400",
          },
        ],
        "hero-greet": [
          "clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem)",
          {
            lineHeight: "clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem)",
            fontWeight: "400",
          },
        ],
        "hero-title": [
          "clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem)",
          {
            lineHeight: "clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem)",
            fontWeight: "400",
          },
        ],
        "hero-subtitle": [
          "clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem)",
          {
            lineHeight: "clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem)",
            fontWeight: "400",
          },
        ],
        "project-description": [
          "clamp(0.75rem, 0.70426828rem + 0.195122vw, 0.875rem)",
          {
            lineHeight: "clamp(0.75rem, 0.70426828rem + 0.195122vw, 0.875rem)",
            fontWeight: "600",
          },
        ],
        "project-technologies": [
          "clamp(0.625rem, 0.57926828rem + 0.195122vw, 0.75rem)",
          {
            lineHeight: "clamp(0.625rem, 0.57926828rem + 0.195122vw, 0.75rem)",
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
    },
  },
  plugins: [],
};
