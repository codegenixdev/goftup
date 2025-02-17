import { useGlobalStore } from "@/hooks/useGlobalStore";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Direction } from "@/types/direction";
import { Language } from "@/types/language";

import { Languages } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type LanguageOption = {
	value: Language;
	label: string;
};

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const { language, updateLanguage, updateDirection, direction } =
		useGlobalStore();

	const languageOptions: LanguageOption[] = [
		{ value: "en", label: "English" },
		{ value: "fa", label: "فارسی" },
	];

	const updateHtmlAttributes = (lang: Language, dir: Direction) => {
		document.documentElement.lang = lang;
		document.documentElement.dir = dir;
	};

	useEffect(() => {
		if (language) {
			i18n.changeLanguage(language);
			const dir = language === "fa" ? "rtl" : "ltr";
			updateHtmlAttributes(language, dir);
			updateDirection(dir);
		}
	}, []);

	const handleLanguageChange = (lang: Language) => {
		const dir = lang === "fa" ? "rtl" : "ltr";
		updateLanguage(lang);
		updateDirection(dir);
		updateHtmlAttributes(lang, dir);
		i18n.changeLanguage(lang);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Languages className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Toggle language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{languageOptions.map(({ value, label }) => (
					<DropdownMenuItem
						key={value}
						dir={direction}
						onClick={() => handleLanguageChange(value)}
						className="flex items-center gap-2"
					>
						<span
							className={`text-sm ${language === value ? "font-bold" : ""}`}
						>
							{label}
						</span>
						{language === value && (
							<span className="ml-auto text-xs text-muted-foreground">✓</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { LanguageSwitcher };
