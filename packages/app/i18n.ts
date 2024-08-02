import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { SupportedLanguages } from "./constants/supportedLanguages";

import en from "./locales/en.json";
import zh from "./locales/zh.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: SupportedLanguages.English,
  supportedLngs: Object.values(SupportedLanguages),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
