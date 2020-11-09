import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const DropdownSelectField = ({
  fieldId,
  fieldName,
  fieldOptions,
  fieldValue,
  onFieldChange,
  fieldLabel,
}) => {
  return (
    <Autocomplete
      id={fieldId}
      name={fieldName}
      options={fieldOptions}
      value={fieldValue || ''}
      getOptionLabel={(option) => option.label || ''}
      onChange={(e, option) => {!!option && onFieldChange(option)}}
      blurOnSelect
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label={fieldLabel} />
      )}
    />
  );
};

export default DropdownSelectField;
