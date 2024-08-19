import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './languages/en.json';
import translationFR from './languages/fr.json';

export const LanguageENUM = {
  FR: 'fr',
  EN: 'en',
};

// the translations
const resources = {
  fr: {
    translation: translationFR,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.i18nextLng || LanguageENUM.FR,
    fallbackLng: LanguageENUM.FR,

    keySeparator: '.', // to support nested translations

    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
