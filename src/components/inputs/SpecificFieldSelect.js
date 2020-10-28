import React, { useCallback } from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/CustomInput/AutoCompleteSelectField';

const SpecificFieldSelect = ({
  fields,
  handleOptionsChange,
  value,
  selectedMajorFields,
  loading,
}) => {
  const availableSpecificFieldsOptions = useCallback(() => {
    if (!!selectedMajorFields && selectedMajorFields.length > 0) {
      let availableSubFields;
      availableSubFields = selectedMajorFields
        .map((majorField) => {
          let majorFieldRelatedOptions;
          const majorFieldRelatedSubFields = fields.filter(
            (field) => field.label === majorField.label,
          )[0].fields;
          majorFieldRelatedOptions = majorFieldRelatedSubFields.map(
            (subfield) => {
              subfield['majorField'] = majorField.label;
              return subfield;
            },
          );
          return majorFieldRelatedOptions;
        })
        .flat();

      return availableSubFields;
    } else {
      return [];
    }
  }, [selectedMajorFields]);

  return (
    <AutoCompleteSelectField
      name='specificFieldsOfExperience'
      id='specificFieldsOfExperienceSelect'
      onChange={handleOptionsChange}
      groupBy={(option) => option.majorFieldLabel}
      options={availableSpecificFieldsOptions()}
      value={value}
      inputLabel={t['specificField']}
      loading={loading}
    />
  );
};

export default SpecificFieldSelect;
