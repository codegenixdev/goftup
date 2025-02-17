import { usePageTitle } from "@/hooks/usePageTitle";

import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const LandingDemo = () => {
	const { t } = useTranslation();
	usePageTitle();

	return (
		<div className="h-[calc(100dvh-80px)] flex items-center justify-center">
			<div className="max-w-2xl text-center space-y-6 px-4">
				<h1 className="text-4xl font-bold">{t("demoTitle")}</h1>

				<div className="space-y-4">
					<p className="text-lg">{t("demoDescription")}.</p>

					<div className="bg-widget-primary/20 p-4 rounded-lg border border-widget-primary/50">
						<p>{t("demoInstruction")}.</p>
					</div>
				</div>

				<Link
					to="/admin"
					className="block mt-8 p-4 bg-primary/20 rounded-lg border border-primary/50 hover:bg-primary/30 transition-colors"
				>
					<p>{t("adminInstruction")}.</p>
				</Link>
			</div>
		</div>
	);
};

export { LandingDemo };
