import { App } from "@/app";
import "@/i18n/i18n";
import "@/index.css";

import i18next from "i18next";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
	</StrictMode>
);
