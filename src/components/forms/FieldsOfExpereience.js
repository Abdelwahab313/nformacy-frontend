import React, { Fragment, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useFormContext } from 'react-hook-form';
import { useStyles } from 'styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';
import FieldsSelect from '../inputs/FieldsSelect/FieldsSelect';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import authManager from 'services/authManager';

const FieldsOfExperience = () => {
  const { errors, watch, setValue, register } = useFormContext();
  const classes = useStyles();
  const fields = watch('fields');
  const { t } = useTranslation();

  useEffect(() => {
    // check if name was existed before
    register({ name: 'fields' });
  }, [register]);
  const isClient = authManager.isClient();

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
                {isClient ? t('experiencedInClient') : t('experiencedIn')}
              </Typography>
              <HelpIcon
                className={classes.formHeaderIcon}
                data-tip={t('experiencedInHint')}
                color='primary'
                fontSize='small'
              />
            </div>
            <CustomTypography
              variant='body1'
              fontWeight='light'
              className={classes.removeNestedText}
              gutterBottom>
              {t('experiencedInHint')}
            </CustomTypography>
            <MajorField />
            <ErrorMessage errorField={errors.majorFieldsOfExperience} />
          </Container>
          <Container maxWidth={false} className={classes.formControl}>
            <div className={classes.formHeader}>
              <Typography
                gutterBottom
                className={classes.fieldLabelStylesDesktop}>
                {isClient ? t('specificallyIn') : t('specificallyInClients')}
              </Typography>
              <HelpIcon
                className={classes.formHeaderIcon}
                data-tip={t('specificallyInHint')}
                color='primary'
                fontSize='small'
              />
            </div>
            <CustomTypography
              variant='body1'
              fontWeight='light'
              className={classes.removeNestedText}
              gutterBottom>
              {t('specificallyInHint')}
            </CustomTypography>
            <Field />
            <ErrorMessage errorField={errors.fields} />
          </Container>
        </Fragment>
      )}
    </FieldsSelect>
  );
};

export default FieldsOfExperience;
