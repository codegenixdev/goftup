import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

const Navbar = () => {
	const { t } = useTranslation();
	const location = useLocation();

	const isActiveLink = (path: string) => {
		return location.pathname === path;
	};

	const getLinkClasses = (path: string) => {
		return `transition-colors ${
			isActiveLink(path)
				? "text-primary font-medium"
				: "text-foreground hover:text-foreground/80"
		}`;
	};

	return (
		<nav className="w-full bg-card shadow-md sticky top-0">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Link
							to="/"
							className="flex items-center gap-2 font-bold text-lg mr-4"
						>
							<img src="/logo.png" alt="Logo" className="h-7 w-auto" />
							{t("brand")}
						</Link>
						<Link to="/" className={getLinkClasses("/")}>
							{t("nav.home")}
						</Link>
						<Link to="/admin" className={getLinkClasses("/admin")}>
							{t("chats")}
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
};

export { Navbar };
