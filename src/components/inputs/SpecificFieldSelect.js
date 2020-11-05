import React, { useCallback } from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/inputs/AutoCompleteSelectField';

const SpecificFieldSelect = ({
                               fields,
                               handleOptionsChange,
                               selectedFields,
                               loading,
                               selectedMajorFieldIDs,
                             }) => {

  const availableFieldsOptions = useCallback(() => {
    if (!!selectedMajorFieldIDs && selectedMajorFieldIDs.length > 0) {
      const availableSubFields = fields.filter((majorField) => {
        selectedMajorFieldIDs.includes(majorField.id);
      }).map((majorField) => (
        majorField.fields.map((subfield) => {
          subfield['majorField'] = majorField.label;
          return subfield;
        })
      ));
      return availableSubFields;
    } else {
      return [];
    }
  }, [selectedMajorFieldIDs]);

  return (
    <AutoCompleteSelectField
      name='specificFieldsOfExperience'
      id='specificFieldsOfExperienceSelect'
      onChange={handleOptionsChange}
      groupBy={(option) => option.majorField}
      options={availableFieldsOptions()}
      value={selectedFields}
      inputLabel={t['specificField']}
      loading={loading}
    />
  );
};

export default SpecificFieldSelect;
