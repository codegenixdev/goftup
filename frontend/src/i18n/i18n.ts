import { resources } from "@/i18n/resources";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	fallbackLng: "fa",
	interpolation: {
		escapeValue: false,
	},
	resources,
});

export default i18n;
