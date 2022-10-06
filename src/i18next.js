import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import VI from "./asset/locales/vi.json";
import EN from "./asset/locales/en.json";

const resources = {
  vi: {
    translation: VI,
  },
  en: {
    translation: EN,
  },
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: "vi",
  debug: true,
  detection: {
    order: ["cookies", "queryString"],
    cache: ["cookies"],
  },
  interpolation: {
    escapeValue: true,
  },
});

export default i18next;
