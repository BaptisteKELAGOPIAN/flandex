/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        flantheme: {
          "primary": "#D98C45",    /* Doré Croûte */
          "secondary": "#5C3D2E",  /* Caramel Sombre */
          "accent": "#F8E282",     /* Crème Vanille */
          "neutral": "#5C3D2E",
          "base-100": "#FFFDF5",   /* Fond Clair Crème */
          "base-200": "#F7F3E9",
          "base-300": "#EEE9DC",
          "info": "#D98C45",
          "success": "#D98C45",
          "warning": "#F8E282",
          "error": "#5C3D2E",
        },
      },
    ],
  },
}
