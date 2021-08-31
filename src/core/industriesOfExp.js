export const renderIndustriesOfExperience = (arrOfIndustriesOfExp) => {
  if (!arrOfIndustriesOfExp) return '-';
  if (arrOfIndustriesOfExp.length <= 1) return arrOfIndustriesOfExp[0].label;
  let arrOfIndustriesOfExpInSingleString = '';
  arrOfIndustriesOfExp.forEach((industry) => arrOfIndustriesOfExpInSingleString += `${industry.label}, `);
  return arrOfIndustriesOfExpInSingleString;
};
