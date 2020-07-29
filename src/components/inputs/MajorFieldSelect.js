import React from 'react';
import t from 'locales/en/freelancerProfile.json';
import AutoCompleteSelectField from 'components/CustomInput/AutoCompleteSelectField';
import { fieldsOfExperience } from 'constants/dropDownOptions';

const MajorFieldSelect = ({ handleMajorFieldsSelect, defaultValue }) => {

  return (
    <AutoCompleteSelectField
      id='majorFieldsOfExperienceSelect'
      name='majorFieldsOfExperience'
      onChange={handleMajorFieldsSelect}
      options={fieldsOfExperience}
      defaultValue={defaultValue}
      inputLabel={t['majorFieldOfExperience']}
    />
  );
};

export default MajorFieldSelect;