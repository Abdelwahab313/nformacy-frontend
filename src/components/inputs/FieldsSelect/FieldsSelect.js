import React, { useEffect, useMemo, useState } from 'react';

import useFieldFetcher from 'hooks/useFieldsFetcher';

import AutoCompleteSelectField from '../AutoCompleteSelectField';
import { getMajorFieldsFromSubfields } from '../../../core/fields';
import { useTranslation } from 'react-i18next';

const getSubFieldsOptions = (majorField) => {
  return majorField.fields.map((subfield) => {
    subfield['majorFieldLabel'] = majorField.label;
    subfield['majorFieldId'] = majorField.id;
    return subfield;
  });
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
    setSelectedMajorFields(selectedList);
    const majorFieldIds = selectedList.map((majorField) => majorField.id);
    const updatedSubFields = initialFields?.filter((field) =>
      majorFieldIds.includes(field.majorFieldId),
    );
    updateFields(updatedSubFields);
  };

  // @selectedList [{id,label,majorFieldId}]
  const handleFieldsChange = (selectedList) => {
    updateFields(selectedList);
  };

  // @return [{id,label,majorFieldLabel}]
  const availableSubFieldsOptions = useMemo(() => {
    if (!!selectedMajorFields && selectedMajorFields.length > 0) {
      const selectedMajorFieldsIDs = selectedMajorFields.map(
        (majorField) => majorField.id,
      );

      const availableMajorFields = majorFieldsOptions?.filter((majorField) => {
        return selectedMajorFieldsIDs.includes(majorField.id);
      });

      const availableSubFields = availableMajorFields
        ?.map((majorField) => getSubFieldsOptions(majorField))
        .flat();
      return availableSubFields;
    } else {
      return [];
    }
  }, [selectedMajorFields, majorFieldsOptions]);

  const MajorField = ({ single = false, disabled, inputLabel }) => {
    const { t } = useTranslation();
    const handleChange = (newValue) => {
      if (!!single) {
        newValue = !!newValue ? [newValue] : [];
      }
      handleMajorFieldChange(newValue);
    };
    const fieldsValue = !!single
      ? !!selectedMajorFields
        ? selectedMajorFields[0]
        : null
      : selectedMajorFields;

    return (
      <AutoCompleteSelectField
        id='majorFieldsOfExperienceSelect'
        name='majorFieldsOfExperience'
        inputLabel={!!inputLabel ? inputLabel : t('majorFields')}
        options={majorFieldsOptions}
        value={fieldsValue}
        onChange={handleChange}
        loading={loading}
        multiple={!single}
        disabled={disabled}
      />
    );
  };

  const Field = ({ disabled, inputLabel }) => {
    const { t } = useTranslation();
    return (
      <AutoCompleteSelectField
        name='fields'
        id='specificFieldsOfExperienceSelect'
        inputLabel={!!inputLabel ? inputLabel : t('specificField')}
        options={availableSubFieldsOptions}
        value={initialFields}
        onChange={handleFieldsChange}
        groupBy={(option) => option.majorFieldLabel}
        loading={loading}
        disabled={disabled}
      />
    );
  };
  return children({ MajorField, Field });
};

export default FieldsSelect;
