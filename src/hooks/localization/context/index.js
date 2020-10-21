import React, { createContext, useContext, useReducer } from 'react';

const LocaleContext = createContext();
const DEFAULT_LOCALE = 'en';
const LOCALES = {
  en: 'en',
  ar: 'ar',
};
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (context === undefined)
    throw new Error('useLocale should only be used within locale provider');
  return context;
};

export const LocaleProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
}) => {
  const { Provider } = LocaleContext;
  return (
    <Provider value={useReducer(localeReducer, initialLocale)}>{children}</Provider>
  );
};

const localeReducer = (state, action) => {
  if (action.type === CHANGE_LOCALE) {
    return action.payload.locale;
  }
  return LOCALES.en;
};
