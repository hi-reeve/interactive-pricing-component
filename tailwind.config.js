module.exports = {
    mode: "jit",
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                manrope: ["Manrope", "sans-serif"],
            },
            colors: {
                cyan: {
                    soft: "var(--soft-cyan)",
                    strong: "var(--strong-cyan)",
                },
                "light-red": {
                    DEFAULT: "var(--light-red)",
                    grayish: "var(--light-gray-red)",
                },
                "pale-blue": {
                    DEFAULT: "var(--pale-blue)",
                    very: "var(--very-pale-blue)",
                },
                "light-blue": {
                    light: "var(--light-gray-blue-2)",
                    dark: "var(--light-gray-blue)",
                },
                "gray-blue": {
                    DEFAULT: "var(--gray-blue)",
                },
                "dark-blue": {
                    DEFAULT: "var(--dark-blue)",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
