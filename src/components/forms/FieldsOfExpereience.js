import React, { Fragment, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useFormContext } from 'react-hook-form';
import { useStyles } from 'styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';
import t from '../../locales/en/freelancerProfile.json';
import MajorFieldSelect from 'components/inputs/MajorFieldSelect';
import SpecificFieldSelect from 'components/inputs/SpecificFieldSelect';
import FieldsSelect from '../inputs/FieldsSelect/FieldsSelect';

const FieldsOfExperience = () => {
  const { errors, watch, setValue, register } = useFormContext();
  const classes = useStyles();
  const majorFieldsOfExperience = watch('majorFieldsOfExperience');
  const specificFieldsOfExperience = watch('specificFieldsOfExperience');

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

  return (
    <FieldsSelect>
      {(fields, loading) => (
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
            <MajorFieldSelect
              handleOptionsChange={handleMajorFieldsSelect}
              fields={fields}
              loading={loading}
              value={majorFieldsOfExperience}
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
            <SpecificFieldSelect
              fields={fields}
              loading={loading}
              value={specificFieldsOfExperience}
              handleOptionsChange={handleSubFieldsChange}
              selectedMajorFields={majorFieldsOfExperience}
            />
            <ErrorMessage errorField={errors.specificFieldsOfExperience}/>
          </Container>
        </Fragment>
      )}
    </FieldsSelect>
  );
};

export default FieldsOfExperience;
