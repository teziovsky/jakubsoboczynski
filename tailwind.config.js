/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: [
          "var(--font-inter)",
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
          "var(--font-space-mono)",
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
      minHeight: {
        "inner-screen-contact": "calc(100vh - 540px)",
        "inner-screen": "calc(100vh - 285px)",
        "inner-screen-lg": "calc(100vh - 90px)",
      },
      inset: {
        logo: "clamp(0.9375rem, 0.50304867rem + 1.853659vw, 2.125rem)",
        error: "calc(50% - 100px)",
        "error-lg": "calc(50% - 80px)",
      },
      width: {
        logo: "clamp(4.375rem, 3.68902445rem + 2.926829vw, 6.25rem)",
      },
      maxWidth: {
        "about-me-image": "clamp(12.5rem, 11.35670727rem + 4.878049vw, 15.625rem)",
      },
      padding: {
        "project-info": "clamp(1.38rem, 1.208rem + 0.7337vw, 1.85rem) clamp(1.85rem, 1.6122rem + 1.0146vw, 2.5rem)",
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
          "clamp(0.75rem, 0.7043rem + 0.1951vw, 0.875rem)",
          {
            lineHeight: "clamp(0.95rem, 0.9043rem + 0.1951vw, 1.075rem)",
            fontWeight: "300",
            letterSpacing: "0.02em",
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
    container: {
      center: true,
    },
  },
  plugins: [],
};
