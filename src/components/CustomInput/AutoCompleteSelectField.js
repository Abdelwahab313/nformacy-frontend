import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { selectCheckBox } from 'styles/formsStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { darkBlue } from 'styles/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const useSelectStyles = makeStyles(() => ({
  inputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: darkBlue,
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

const AutoCompleteSelectField = ({
  options,
  onChange,
  value = [],
  inputLabel,
  loading,
  ...props
}) => {
  const selectClasses = useSelectStyles();
  const handleChange = (e, newList) => {
    !!onChange && onChange(newList);
  };

  return (
    <Autocomplete
      onChange={handleChange}
      multiple
      loading={loading}
      classes={selectClasses}
      options={options || []}
      value={value}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => {
        return option.id === value.id;
      }}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            color='primary'
            checkedIcon={checkedIcon}
            style={selectCheckBox}
            checked={selected}
          />
          {option.label}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label={inputLabel} />
      )}
      {...props}
    />
  );
};

export default AutoCompleteSelectField;
