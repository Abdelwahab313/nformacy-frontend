import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useFormContext } from 'react-hook-form';
import { fieldsOfExperience } from '../../constants/dropDownOptions';
import { multiSelectStyles, useStyles } from '../../styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';
import t from '../../locales/en/freelancerProfile.json';
import { Multiselect } from 'multiselect-react-dropdown';

const FieldsOfExperience = () => {
  const { errors, watch, setValue, register } = useFormContext();
  const classes = useStyles();
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
  const handleMajorFieldsRemove = useCallback(
    (selectedList, removedItem) => {
      setValue('majorFieldsOfExperience', selectedList);
      const filteredSelectedSpecificFields = specificFieldsOfExperience.filter(
        (subField) => subField.majorField !== removedItem.label,
      );
      setValue('specificFieldsOfExperience', filteredSelectedSpecificFields);
    },
    [specificFieldsOfExperience],
  );

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
        <Multiselect
          className={classes.selectControl}
          id='majorFieldsOfExperienceSelect'
          name='majorFieldsOfExperience'
          label={t['specificField']}
          closeOnSelect={false}
          style={multiSelectStyles}
          options={fieldsOfExperience}
          avoidHighlightFirstOption
          onSelect={handleMajorFieldsSelect}
          onRemove={handleMajorFieldsRemove}
          selectedValues={majorFieldsOfExperience}
          displayValue='label'
          hidePlaceholder
          closeIcon={'cancel'}
          showCheckbox={true}
        />
        <ErrorMessage errorField={errors.majorFieldsOfExperience} />
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
        <Multiselect
          className={classes.selectControl}
          name='specificFieldsOfExperience'
          id='specificFieldsOfExperienceSelect'
          label={t['specificField']}
          style={multiSelectStyles}
          options={availableSpecificFieldsOptions()}
          onSelect={handleSubFieldsChange}
          onRemove={handleSubFieldsChange}
          selectedValues={specificFieldsOfExperience}
          displayValue='label'
          groupBy='majorField'
          hidePlaceholder
          closeOnSelect
          closeIcon={'cancel'}
          showCheckbox={true}
        />
        <ErrorMessage errorField={errors.specificFieldsOfExperience} />
      </Container>
    </Fragment>
  );
};

export default FieldsOfExperience;
