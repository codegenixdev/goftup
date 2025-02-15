import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useStore } from "@/useStore";
import { Language } from "@/types/language";
import { Direction } from "@/types/direction";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { language, updateLanguage, updateDirection } = useStore();

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
    <div className="flex gap-2">
      <Button
        variant={language === "fa" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("fa")}
      >
        FA
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </Button>
    </div>
  );
};

export { LanguageSwitcher };
