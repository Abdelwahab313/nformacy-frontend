import React, { useEffect, useMemo, useState } from 'react';

import useFieldFetcher from 'hooks/useFieldsFetcher';

import t from '../../../locales/en/freelancerProfile.json';
import AutoCompleteSelectField from '../../CustomInput/AutoCompleteSelectField';

const getSubFieldsOptions = (majorField) => {
  return majorField.fields.map((subfield) => {
    subfield['majorFieldLabel'] = majorField.label;
    subfield['majorFieldId'] = majorField.id;
    return subfield;
  });
};
const getMajorFieldsFromSubfields = (majorFieldsOptions, subfields) => {
  let majorFieldsIds = subfields?.map((subfield) => subfield.majorFieldId);
  majorFieldsIds = [...new Set(majorFieldsIds)];
  return majorFieldsOptions.filter((majorField) =>
    majorFieldsIds.includes(majorField.id),
  );
};

const FieldsSelect = ({ initialFields, updateFields, children }) => {
  const [selectedMajorFields, setSelectedMajorFields] = useState();
  const { fields: majorFieldsOptions, loading } = useFieldFetcher();

  useEffect(() => {
    if (!loading) {
      const initialMajorFieldValue = getMajorFieldsFromSubfields(
        majorFieldsOptions,
        initialFields,
      );
      setSelectedMajorFields(initialMajorFieldValue);
    }
  }, [majorFieldsOptions, loading]);

  const handleMajorFieldChange = (selectedList) => {
    console.log('---Change ', selectedList);
    setSelectedMajorFields(selectedList);
    const majorFieldIds = selectedList.map(
      (majorField) => majorField.id,
    );
    const updatedSubFields = initialFields.filter((field) =>
      majorFieldIds.includes(field.majorFieldId),
    );
    console.log('---UPDATED SUB FIELDS', updatedSubFields);
    updateFields([...updatedSubFields]);
  };

  // @selectedList [{id,label,majorFieldId}]
  const handleFieldsChange = (selectedList) => {
    // console.log('--------subfield', selectedList, majorFieldsOptions)
    updateFields(selectedList);
  };

  // @return [{id,label,majorFieldLabel}]
  const availableSubFieldsOptions = useMemo(() => {
    // console.log('-------', selectedMajorFields);
    if (!!selectedMajorFields && selectedMajorFields.length > 0) {
      const selectedMajorFieldsIDs = selectedMajorFields.map(
        (majorField) => majorField.id,
      );

      const availableMajorFields = majorFieldsOptions.filter((majorField) => {
        return selectedMajorFieldsIDs.includes(majorField.id);
      });
      // console.log('-------+++', selectedMajorFieldsIDs, majorFieldsOptions, availableMajorFields);

      const availableSubFields = availableMajorFields
        ?.map((majorField) => getSubFieldsOptions(majorField))
        .flat();
      // console.log('available subfields', availableSubFields);
      return availableSubFields;
    } else {
      return [];
    }
  }, [selectedMajorFields, majorFieldsOptions]);

  // console.log('--------', availableSubFieldsOptions);

  const MajorField = () => (
    <AutoCompleteSelectField
      id='majorFieldsOfExperienceSelect'
      name='majorFieldsOfExperience'
      inputLabel={t['majorFieldOfExperience']}
      options={majorFieldsOptions}
      value={selectedMajorFields}
      onChange={handleMajorFieldChange}
      loading={loading}
    />
  );

  const Field = () => (
    <AutoCompleteSelectField
      name='specificFieldsOfExperience'
      id='specificFieldsOfExperienceSelect'
      inputLabel={t['specificField']}
      options={availableSubFieldsOptions}
      value={initialFields}
      onChange={handleFieldsChange}
      groupBy={(option) => option.majorFieldLabel}
      loading={loading}
    />
  );

  return children({ MajorField, Field });
};

export default FieldsSelect;
