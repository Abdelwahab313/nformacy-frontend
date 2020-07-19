import React, { Fragment, useCallback, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useFormContext } from 'react-hook-form';
import { fieldsOfExperience } from '../../constants/dropDownOptions';
import { selectCheckBox, useStyles } from '../../styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';
import t from '../../locales/en/freelancerProfile.json';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { pink } from '../../styles/colors';

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

const FieldsOfExperience = () => {
  const { errors, watch, setValue, register } = useFormContext();
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const majorFieldsOfExperience = watch('majorFieldsOfExperience');
  const specificFieldsOfExperience = watch('specificFieldsOfExperience');

  const availableSpecificFieldsOptions = useCallback(() => {
    if (!!majorFieldsOfExperience && majorFieldsOfExperience.length > 0) {
      let availableSubFields;
      availableSubFields = majorFieldsOfExperience
        .map((majorField) => {
          let majorFieldRelatedOptions;
          const majorFieldRelatedSubFields = fieldsOfExperience.filter(
            (field) => field.label === majorField.label,
          )[0].subfields;
          majorFieldRelatedOptions = majorFieldRelatedSubFields.map(
            (subfield) => {
              subfield['majorField'] = majorField.label;
              return subfield;
            },
          );
          return majorFieldRelatedOptions;
        })
        .flat();

      return availableSubFields;
    } else {
      return [];
    }
  }, [majorFieldsOfExperience]);

  useEffect(() => {
    // check if name was existed before
    register({ name: 'majorFieldsOfExperience' });
    register({ name: 'specificFieldsOfExperience' });
  }, [register]);

  const handleSubFieldsChange = (selectedList) => {
    setValue('specificFieldsOfExperience', selectedList);
  };
  const handleMajorFieldsSelect = (selectedList) => {
    setValue('majorFieldsOfExperience', selectedList);
  };
  const majorSelectionChange = (e, option, reason) => {
    handleMajorFieldsSelect(option);
  };
  const specificFieldSelectionChange = (e, option, reason) => {
    handleSubFieldsChange(option);
  };

  return (
    <Fragment>
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['experiencedIn']}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t['experiencedInHint']}
            color='primary'
            fontSize='small'
          />
        </div>
        <Autocomplete
          id='majorFieldsOfExperienceSelect'
          name='majorFieldsOfExperience'
          classes={selectClasses}
          onChange={majorSelectionChange}
          multiple
          options={fieldsOfExperience}
          defaultValue={majorFieldsOfExperience}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                color='primary'
                icon={icon}
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
              placeholder={t['majorFieldOfExperience']}
            />
          )}
        />
        <ErrorMessage errorField={errors.majorFieldsOfExperience}/>
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['specificallyIn']}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t['specificallyInHint']}
            color='primary'
            fontSize='small'
          />
        </div>
        <Autocomplete
          name='specificFieldsOfExperience'
          id='specificFieldsOfExperienceSelect'
          onChange={specificFieldSelectionChange}
          multiple
          classes={selectClasses}
          groupBy={(option) => option.majorField}
          options={availableSpecificFieldsOptions()}
          defaultValue={specificFieldsOfExperience}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
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
              placeholder={t['specificField']}
            />
          )}
        />
        <ErrorMessage errorField={errors.specificFieldsOfExperience}/>
      </Container>
    </Fragment>
  );
};

export default FieldsOfExperience;
