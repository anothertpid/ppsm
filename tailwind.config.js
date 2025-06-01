/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // This enables class-based dark mode
    content: [
        "./index.html", // Explicitly list index.html
        "./Pages/**/*.html",
        "./Assets/Javascript/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}