import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "fa" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return (
    <div className="flex gap-2">
      <Button
        variant={i18n.language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "fa" ? "default" : "outline"}
        size="sm"
        onClick={() => i18n.changeLanguage("fa")}
      >
        FA
      </Button>
    </div>
  );
};

export { LanguageSwitcher };
