import React, { Fragment } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function DropdownSelectField({
  fieldId,
  fieldName,
  fieldOptions,
  fieldValue,
  onFieldChange,
  fieldLabel,
}) {
  return (
    <Fragment>
      <Autocomplete
        id={fieldId}
        name={fieldName}
        options={fieldOptions}
        value={fieldValue}
        getOptionLabel={(option) => option.label}
        // getOptionSelected={(option, value) => {
        //   return option.value === value.value;
        // }}
        onChange={(e, option) => (!!option && onFieldChange(option))}
        blurOnSelect
        renderInput={(params) => (
          <TextField {...params} variant='outlined' label={fieldLabel} />
        )}
      />
    </Fragment>
  );
}
