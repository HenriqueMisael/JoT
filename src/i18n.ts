import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'home.welcome': 'Welcome to the JoT App!'
    }
  },
  'pt-BR': {
    translation: {
      'home.welcome': 'Bem-vindo ao aplicativo JoT!'
    }
  },
  'fr-CA': {
    translation: {
      'home.welcome': 'Bienvenue dans l\'application JoT!'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'pt-BR', 'fr-CA'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 