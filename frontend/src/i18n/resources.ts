import en from "@/i18n/locales/en/translation.json";
import fa from "@/i18n/locales/fa/translation.json";

const resources = {
  en: {
    translation: en,
    zod: en,
  },
  fa: {
    translation: fa,
    zod: fa,
  },
} as const;

export { resources };
