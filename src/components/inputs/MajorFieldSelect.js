import React from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/CustomInput/AutoCompleteSelectField';
import { fieldsOfExperience } from 'constants/dropDownOptions';

const MajorFieldSelect = ({ handleOptionsChange, value }) => {

  return (
    <AutoCompleteSelectField
      id='majorFieldsOfExperienceSelect'
      name='majorFieldsOfExperience'
      onChange={handleOptionsChange}
      options={fieldsOfExperience}
      value={value}
      inputLabel={t['majorFieldOfExperience']}
    />
  );
};

export default MajorFieldSelect;
