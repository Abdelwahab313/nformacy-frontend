export const renderCountries = (countries) => {
  if (!countries) return '-';
  if (countries.length === 1) return countries[0].label;
  let countriesInSingleString = '';
  countries.forEach(
    (country) => (countriesInSingleString += `${country.label}, `),
  );
  return countriesInSingleString;
};
