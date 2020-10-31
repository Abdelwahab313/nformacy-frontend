import _ from 'lodash';

export const getMajorFieldsFromSubfields = (majorFieldsOptions, subfields) => {
  let majorFieldsIds = subfields?.map((subfield) => (subfield.majorFieldId));
  majorFieldsIds = [...new Set(majorFieldsIds)];
  return majorFieldsOptions.filter((majorField) => majorFieldsIds.includes(majorField.id));
};

export const getFieldLabel = (fields, fieldId) => {
  return fields?.find((field) => field.id === fieldId)?.label;
};


export const groupFieldsByMajorFieldId = (fieldsLabels, fields) => {
  const groupedByFields = _.chain(fields)
    // Group the elements of Array based on `majorFieldId` property
    .groupBy('majorFieldId')
    // `key` is group's name (majorFieldId), `value` is the array of objects
    .map((value, key) => ({
      majorFieldId: key,
      majorFieldLabel: getFieldLabel(fieldsLabels, Number(key)),
      subfields: value,
    }))
    .value();
  return groupedByFields;
};
