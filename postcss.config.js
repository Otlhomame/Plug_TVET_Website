/**
 * PostCSS pipeline for Tailwind CSS.
 * Tailwind must always be listed first, then autoprefixer.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};