// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
	brand: {
		50: "#e5e4ff",
		100: "#b3b3ff",
		200: "#8280ff",
		300: "#504dff",
		400: "#201bfe",
		500: "#0a01e5",
		600: "#0400b3",
		700: "#010081",
		800: "#000050",
		900: "#000020",
	},
};
// 2. Add your color mode config
const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
	config,
	colors,
	fonts: {
		heading: `"Poppins", sans-serif`,
		subHeading: `"Poppins", sans-serif`,
		body: `"Poppins", sans-serif`,
	},
});

export default theme;