/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                calligraphy: ["Carolena Narashy", "sans-serif"],
            },
            colors: {
                gray: {
                    50: "#FFFFFF",
                    100: "#EFEFEF",
                    200: "#DCDCDC",
                    300: "#BDBDBD",
                    400: "#989898",
                    500: "#7C7C7C",
                    600: "#656565",
                    700: "#525252",
                    800: "#464646",
                    900: "#3D3D3D",
                    950: "#292929",
                },
                orange: {
                    50: "#FFF9ED",
                    100: "#FEF1D6",
                    200: "#FDE0AB",
                    300: "#FBC876",
                    400: "#F8A63F",
                    500: "#F69329",
                    600: "#E67010",
                    700: "#BF550F",
                    800: "#984314",
                    900: "#7A3914",
                    950: "#421B08",
                },
            },
        },
    },
    plugins: [],
};
