import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import arLocale from 'i18n-iso-countries/langs/ar.json';

export const getCountriesOptions = (isRTL) => {
  countries.registerLocale(enLocale);
  countries.registerLocale(arLocale);

  if (isRTL) {
    const countryObjAr = countries.getNames('ar', { select: 'official' });
    return Object.keys(countryObjAr).map((key) => {
      return { value: key, label: countryObjAr[key] };
    });
  } else {
    const countryObj = countries.getNames('en', { select: 'official' });
    return Object.keys(countryObj).map((key) => {
      return { value: key, label: countryObj[key] };
    });
  }
};
