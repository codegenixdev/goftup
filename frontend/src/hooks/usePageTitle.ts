import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const usePageTitle = (titleKey?: string) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (titleKey) {
			document.title = `${t(titleKey)} | ${t("brand")}`;
		} else {
			document.title = `${t("brand")}: ${t("slogan")}`;
		}
	}, [titleKey, t]);
};

export { usePageTitle };
