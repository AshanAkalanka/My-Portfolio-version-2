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
                    DEFAULT: '#2563eb',
                    hover: '#1d4ed8',
                    light: '#3b82f6'
                }
            },
            fontFamily: {
                caveat: ['Caveat', 'cursive'],
            },
        },
    },
    plugins: [],
}
