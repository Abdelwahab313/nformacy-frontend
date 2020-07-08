import React, { Fragment, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { Controller, useFormContext } from 'react-hook-form';
import { fieldsOfExperience } from '../constants/dropDownOptions';
import ReactSelect from 'react-select';
import { selectStyle, useStyles } from '../styles/formsStyles';
import ErrorMessage from '../components/errors/ErrorMessage';
import t from '../locales/en/freelancerProfile.json';
import AssignmentPreferences from '../components/forms/AssignmentPreferences';

const FieldsOfExperience = ({ user }) => {
  const { control, errors, setValue, getValues } = useFormContext();
  const defaultExperiencesOptions = user?.majorFieldsOfExperience?.map(
    (userMajor) =>
      fieldsOfExperience.find((exp) => exp.value === userMajor.value)?.subfield,
  );
  const [specificFields, setSpecificFields] = useState(
    defaultExperiencesOptions
      ? [].concat.apply([], defaultExperiencesOptions)
      : [],
  );
  const classes = useStyles();

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
        <Controller
          id='majorFieldsOfExperienceSelect'
          name='majorFieldsOfExperience'
          rules={{ required: t['requiredMessage'] }}
          control={control}
          onChange={([, selectionAction]) => {
            const { action } = selectionAction;
            if (action === 'select-option') {
              const { option } = selectionAction;
              const selectedSpecificFields = fieldsOfExperience.find(
                (exp) => exp.value === option.value,
              ).subfield;
              const allSelections = [
                ...specificFields,
                ...selectedSpecificFields,
              ];
              setSpecificFields(allSelections);
              const currentMajor = getValues('majorFieldsOfExperience') || [];
              return [
                ...currentMajor,
                { value: option.value, label: option.label },
              ];
            } else if (action === 'remove-value') {
              const { removedValue } = selectionAction;
              const selectedSpecificFields = fieldsOfExperience.find(
                (exp) => exp.value === removedValue?.value,
              )?.subfield;
              const allSelections = specificFields?.filter(
                (exp) =>
                  selectedSpecificFields?.filter(
                    (selectedExp) => selectedExp.value === exp.value,
                  ).length === 0,
              );
              const selectedValues = getValues('specificFieldsOfExperience');
              const filteredSelectedValues = selectedValues?.filter(
                (exp) =>
                  selectedSpecificFields?.filter(
                    (selectedExp) => selectedExp.value === exp.value,
                  ).length === 0,
              );
              setValue('specificFieldsOfExperience', filteredSelectedValues);
              setSpecificFields(allSelections);
              let filteredValues = getValues('majorFieldsOfExperience').filter(
                (exp) => exp.value !== removedValue.value,
              );
              return filteredValues?.length === 0
                ? null
                : filteredSelectedValues;
            } else if (action === 'clear') {
              setSpecificFields([]);
              setValue('specificFieldsOfExperience', null);
              setValue('majorFieldsOfExperience', null);
            }
          }}
          as={
            <ReactSelect
              isMulti
              options={fieldsOfExperience}
              className={classes.selectControl}
              styles={selectStyle}
              value={
                !!user.majorFieldsOfExperience
                  ? user.majorFieldsOfExperience.map(
                  (userMajorFieldOfExperience) => {
                    return fieldsOfExperience.find(
                      (majorFieldOfExperience) =>
                        userMajorFieldOfExperience ===
                        majorFieldOfExperience.value,
                    );
                  },
                  )
                  : []
              }
              label={t['majorFieldOfExperience']}
            />
          }
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
        <Controller
          id='specificFieldsOfExperienceSelect'
          name='specificFieldsOfExperience'
          rules={{ required: t['requiredMessage'] }}
          control={control}
          as={
            <ReactSelect
              isMulti
              options={specificFields}
              className={classes.selectControl}
              label={t['specificField']}
              styles={selectStyle}
              value={
                !!user.specificFieldsOfExperience
                  ? user.specificFieldsOfExperience.map(
                  (userSpecificFieldOfExperience) => {
                    return specificFields.find(
                      (specificFieldOfExperience) =>
                        userSpecificFieldOfExperience ===
                        specificFieldOfExperience?.value,
                    );
                  },
                  )
                  : []
              }
            />
          }
        />
        <ErrorMessage errorField={errors.specificFieldsOfExperience}/>
      </Container>
      <AssignmentPreferences/>
    </Fragment>
  );
};

export default FieldsOfExperience;
