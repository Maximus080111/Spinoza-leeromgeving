import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                oswald: ["Oswald", "sans-serif"],
                roboto: ["Roboto Mono", "monospace"],
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "button-kleur": "#1f2936",
                "button-kleur-hover": "#7885a4",
            },
        },
    },

    plugins: [forms],
};
