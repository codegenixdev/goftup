import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/mode-toggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="w-full bg-card shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">{t("brand")}</span>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
