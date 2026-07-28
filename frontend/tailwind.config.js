/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1e3a8a',
                    hover: '#172554',
                    light: '#3b82f6'
                }
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                display: ['Manrope', 'DM Sans', 'sans-serif'],
                caveat: ['Caveat', 'cursive'],
            },
        },
    },
    plugins: [],
}
