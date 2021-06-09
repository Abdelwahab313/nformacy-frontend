import React, { Fragment, useState, useEffect } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import useFieldFetcher from 'hooks/useFieldsFetcher';
import LoadingCircle from 'components/progress/LoadingCircle';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  InputLabel,
  TextareaAutosize,
} from '@material-ui/core';
import authManager from 'services/authManager';
import { getMajorFieldsFromSubfields } from 'core/fields';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';

const ConsultantVerificationForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const subFields = currentUser.fields;
  const { fields: fieldsLabels, loading } = useFieldFetcher();
  const majorFields = getMajorFieldsFromSubfields(fieldsLabels, subFields);

  const [consultantEvaluation, setConsultantEvaluation] = useState({
    fieldsEvaluation: [],
    hourlyRate: 0,
    comment: '',
    isVerified: false,
  });

  useEffect(() => {
    if (!!majorFields) {
      const majorFieldsWithRating = majorFields?.map((field) => ({
        id: field.id,
        label: field.label,
        rating: field.rating,
      }));
      setConsultantEvaluation({
        ...consultantEvaluation,
        fieldsEvaluation: majorFieldsWithRating,
      });
    }
  }, [majorFields?.length]);

  const handleFieldsEvaluation = (e, fieldId) => {
    const newFieldsEvaluation = consultantEvaluation?.fieldsEvaluation?.map(
      (field) =>
        field.id == fieldId ? { ...field, rating: e.target.value } : field,
    );
    setConsultantEvaluation({
      ...consultantEvaluation,
      fieldsEvaluation: [...newFieldsEvaluation],
    });
  };

  const onSubmit = () => {
    setConsultantEvaluation({
      fieldsEvaluation: [],
      hourlyRate: 0,
      comment: '',
      isVerified: false,
    });
  };

  if (loading)
    return (
      <LoadingCircle size={15} containerClass={classes.loadingContainer} />
    );

  return (
    <form noValidate autoComplete='off'>
      {consultantEvaluation?.fieldsEvaluation?.map((field, key) => {
        return (
          <Fragment>
            <GridContainer>
              <GridItem xs={4}>
                <div key={key}>{field.label}</div>
              </GridItem>
              <GridItem xs={8}>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  onChange={(e) => handleFieldsEvaluation(e, field.id)}>
                  <GridContainer>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value='0'
                        control={<Radio color='primary' />}
                        label='Junior'
                        labelPlacement='end'
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value='1'
                        control={<Radio color='primary' />}
                        label='Mid'
                        t='end'
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value='2'
                        control={<Radio color='primary' />}
                        label='Expert'
                        labelPlacement='end'
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value='3'
                        control={<Radio color='primary' />}
                        label='Guru'
                        labelPlacement='end'
                      />
                    </GridItem>
                  </GridContainer>
                </RadioGroup>
              </GridItem>
            </GridContainer>
          </Fragment>
        );
      })}

      <GridContainer className={classes.consultantEvaluationSections}>
        <GridItem xs={4}>
          <InputLabel className={classes.formLabels} shrink>
            {t('hourlyRatedRequested')}
          </InputLabel>
        </GridItem>
        <GridItem xs={8}>
          <TextField
            name='hourlyRate'
            type='number'
            onChange={(e) =>
              setConsultantEvaluation({
                ...consultantEvaluation,
                hourlyRate: e.target.value,
              })
            }
            value={consultantEvaluation.hourlyRate}
            id='outlined-basic'
            variant='outlined'
          />
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.consultantEvaluationSections}>
        <GridItem xs={4}>
          <InputLabel className={classes.formLabels} shrink>
            {t('comment')}
          </InputLabel>
        </GridItem>
        <GridItem xs={8}>
          <TextareaAutosize
            rowsMin={2}
            rowsMax={4}
            name='comment'
            onChange={(e) =>
              setConsultantEvaluation({
                ...consultantEvaluation,
                comment: e.target.value,
              })
            }
            value={consultantEvaluation.comment}
          />
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.consultantEvaluationSections}>
        <GridItem xs={4}>
          <InputLabel className={classes.formLabels} shrink>
            {t('confirmVerifiedConsultant')}
          </InputLabel>
        </GridItem>
        <GridItem xs={8}>
          <RadioGroup
            row
            aria-label='position'
            onChange={(e) =>
              setConsultantEvaluation({
                ...consultantEvaluation,
                isVerified: e.target.value,
              })
            }
            name='position'>
            <GridContainer>
              <GridItem xs={6}>
                <FormControlLabel
                  value='yes'
                  control={<Radio color='primary' />}
                  label='Yes'
                  labelPlacement='end'
                />
              </GridItem>
            </GridContainer>
            <GridItem xs={6}>
              <FormControlLabel
                value='no'
                control={<Radio color='primary' />}
                label='No'
                labelPlacement='end'
              />
            </GridItem>
          </RadioGroup>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.consultantEvaluationSections}>
        <GridItem xs={12}>
          <SubmitButton
            id={'confirm'}
            onClick={onSubmit}
            size='large'
            className={classes.confirm}
            buttonText={t('confirm')}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

const useStyles = makeStyles(() => ({
  field: {
    margin: 2,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  consultantEvaluationSections: {
    marginTop: 30,
  },
  confirm: {
    float: 'right',
  },
  formLabels: {
    fontSize: 20,
  },
}));

export default ConsultantVerificationForm;
