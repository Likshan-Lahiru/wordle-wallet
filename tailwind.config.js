export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#11C5B8",
      },
      screens: {
        'xs': '375px',     // Mobile phones
        'sm': '640px',     // Small tablets
        'md': '768px',     // Tablets
        'lg': '1024px',    // Laptops
        'xl': '1280px',    // Desktops
        '2xl': '1536px',   // Large desktops
        '3xl': '1920px',   // TV size
        '4xl': '2560px',   // Large TV size
      },
    },
  },
  plugins: [],
}