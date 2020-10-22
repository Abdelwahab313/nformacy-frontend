import LOCALES from '../constants/locale';

export const getLocalizedNumber = (number, locale = LOCALES.en) => {
  return new Intl.NumberFormat(locale).format(number);
};
