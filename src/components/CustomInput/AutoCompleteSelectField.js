import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { selectCheckBox } from 'styles/formsStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { pink } from 'styles/colors';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small'/>;
const checkedIcon = <CheckBoxIcon fontSize='small'/>;

const useSelectStyles = makeStyles(theme => ({
  inputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: pink,
    },
    popupIndicatorOpen: {
      backgroundColor: pink,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: pink,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: pink,
    },
  },
}));

const AutoCompleteSelectField = ({ options, onChange, value, inputLabel, ...props }) => {
  const selectClasses = useSelectStyles();
  const handleChange = (e, newList, reason) => {
    !!onChange && onChange(newList);
  };

  return (
    <Autocomplete
      onChange={handleChange}
      multiple
      classes={selectClasses}
      options={options}
      value={value}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => {
        return option.value === value.value;
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
        <TextField
          {...params}
          variant='outlined'
          label={inputLabel}
        />
      )}
      {...props}
    />
  );
};

export default AutoCompleteSelectField;