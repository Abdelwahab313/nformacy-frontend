import LOCALES from '../constants/locale';

export const getLocalizedNumber = (number, locale = LOCALES.en) => {
  const formattedNumber = new Intl.NumberFormat(locale).format(number);
  if (locale === LOCALES.en) return formattedNumber.replace(/,/g, '');
  return formattedNumber.replace(/،/g, '');
};
