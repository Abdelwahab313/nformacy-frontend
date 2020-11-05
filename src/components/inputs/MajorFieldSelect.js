import React from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/inputs/AutoCompleteSelectField';

const MajorFieldSelect = ({ fields, handleOptionsChange, value, loading }) => {

  return (
    <AutoCompleteSelectField
      id='majorFieldsOfExperienceSelect'
      name='majorFieldsOfExperience'
      onChange={handleOptionsChange}
      loading={loading}
      options={fields}
      value={value}
      inputLabel={t['majorFieldOfExperience']}
    />
  );
};

export default MajorFieldSelect;
