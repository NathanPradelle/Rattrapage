import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import langs from './langs.json';

export const fileNames = [];

const importAllLanguages = async () => {
  const resources = {};

  for (const file of langs) {
    const fileName = file.split('.')[0];
    const module = await import(`./languages/${fileName}.json`);

    resources[fileName] = { translation: module.default || module };
    fileNames.push(fileName);
  }

  return { resources, fileNames };
};

importAllLanguages().then((languages) => {
  const firstLang =
    languages?.fileNames?.find((e) => e === 'FR') || languages?.fileNames[0];

  i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: languages?.resources,
      lng: localStorage.i18nextLng || firstLang,
      fallbackLng: firstLang,

      keySeparator: '.', // to support nested translations

      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
});

export default i18n;
