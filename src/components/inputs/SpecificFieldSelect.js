import React, { useCallback } from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/CustomInput/AutoCompleteSelectField';
import { fieldsOfExperience } from 'constants/dropDownOptions';

const SpecificFieldSelect = ({ handleOptionsChange, value, selectedMajorFields }) => {

  const availableSpecificFieldsOptions = useCallback(() => {
    if (!!selectedMajorFields && selectedMajorFields.length > 0) {
      let availableSubFields;
      availableSubFields = selectedMajorFields
        .map((majorField) => {
          let majorFieldRelatedOptions;
          const majorFieldRelatedSubFields = fieldsOfExperience.filter(
            (field) => field.label === majorField.label,
          )[0].subfields;
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
      groupBy={(option) => option.majorField}
      options={availableSpecificFieldsOptions()}
      value={value}
      inputLabel={t['specificField']}
    />
  );
};

export default SpecificFieldSelect;