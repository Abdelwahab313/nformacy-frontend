import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { darkBlue, lightGrey } from 'styles/colors';
import countryList from 'react-select-country-list';

const useSelectStyles = makeStyles(() => ({
  inputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: lightGrey,
    },
    popupIndicatorOpen: {
      backgroundColor: darkBlue,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: darkBlue,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: darkBlue,
    },
  },
}));

const CountrySelectField = ({
  fieldValue,
  onFieldChange,
  fieldLabel,
  ...props
}) => {
  const selectClasses = useSelectStyles();
  const countries = countryList().getData();

  const handleChange = (e, newList) => {
    !!onFieldChange && onFieldChange(newList);
  };

  return (
    <Autocomplete
      multiple
      id='countrySelect'
      name='countries'
      options={countries}
      value={fieldValue || []}
      onChange={handleChange}
      classes={selectClasses}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, selectedValue) => {
        return option.value === selectedValue.value;
      }}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label={fieldLabel} />
      )}
      {...props}
    />
  );
};

export default CountrySelectField;
