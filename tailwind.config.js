const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter"],
            },
            colors: {
                primary: {
                    DEFAULT: colors.purple[500],
                    ...colors.purple,
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};