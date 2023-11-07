/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				discord: "#738ADB",
				spotify: "#1DB954",
				facebook: "#4267B2",
				github: "#333",
				google: "#f1f1f1",
			},
		},
	},
	plugins: [],
};
