import { ThemeProviderContext } from "@/components/theme-provider";

import { useContext } from "react";

const useThemeContext = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

export { useThemeContext };
