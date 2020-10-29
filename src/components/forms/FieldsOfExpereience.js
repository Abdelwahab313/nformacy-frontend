import React, { Fragment, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useFormContext } from 'react-hook-form';
import { useStyles } from 'styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';
import t from '../../locales/en/freelancerProfile.json';
import FieldsSelect from '../inputs/FieldsSelect/FieldsSelect';

const FieldsOfExperience = () => {
  const { errors, watch, setValue, register } = useFormContext();
  const classes = useStyles();
  const fields = watch('fields');

  useEffect(() => {
    // check if name was existed before
    register({ name: 'fields' });
  }, [register]);

  return (
    <FieldsSelect
      initialFields={fields}
      updateFields={(newOptions) => {
        setValue('fields', newOptions);
      }}>
      {({ MajorField, Field }) => (
        <Fragment>
          <Container maxWidth={false} className={classes.formControl}>
            <div className={classes.formHeader}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['experiencedIn']}
              </Typography>
              <HelpIcon
                className={classes.formHeaderIcon}
                data-tip={t['experiencedInHint']}
                color='primary'
                fontSize='small'
              />
            </div>
            <MajorField />
            <ErrorMessage errorField={errors.majorFieldsOfExperience} />
          </Container>
          <Container maxWidth={false} className={classes.formControl}>
            <div className={classes.formHeader}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {t['specificallyIn']}
              </Typography>
              <HelpIcon
                className={classes.formHeaderIcon}
                data-tip={t['specificallyInHint']}
                color='primary'
                fontSize='small'
              />
            </div>
            <Field />
            <ErrorMessage errorField={errors.specificFieldsOfExperience} />
          </Container>
        </Fragment>
      )}
    </FieldsSelect>
  );
};

export default FieldsOfExperience;
