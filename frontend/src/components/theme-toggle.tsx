import { useGlobalStore } from "@/hooks/useGlobalStore";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Theme } from "@/types/theme";

import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

type ThemeOption = {
	value: Theme;
	icon: LucideIcon;
};

const ThemeToggle = () => {
	const { setTheme } = useTheme();
	const { t } = useTranslation();
	const { direction } = useGlobalStore();

	const themeOptions: ThemeOption[] = [
		{ value: "light", icon: Sun },
		{ value: "dark", icon: Moon },
		{ value: "system", icon: Monitor },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">{t("toggle")}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{themeOptions.map(({ value, icon: Icon }) => (
					<DropdownMenuItem
						key={value}
						dir={direction}
						onClick={() => setTheme(value)}
						className="flex items-center gap-2"
					>
						<Icon className="h-4 w-4" />
						{t(value)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { ThemeToggle };
