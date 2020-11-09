import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    ns: ['common', 'questionRoaster', 'notifications', 'home'],
    defaultNS: 'common',
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'ar'],
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
