import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  TextareaAutosize,
} from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';
import { useTranslation } from 'react-i18next';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import CustomTypography from 'components/typography/Typography';


const ConsultantEvaluationForm = ({ consultantEvaluation, setConsultantEvaluation, onSubmit }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleFieldsEvaluation = (e, fieldName, fieldId) => {
    const updatedFieldsEvaluation = consultantEvaluation?.fieldsRating?.map(
      (field) =>
        field.id == fieldId ? { ...field, [fieldName]: e.target.value } : field,
    );
    setConsultantEvaluation({
      ...consultantEvaluation,
      fieldsRating: [...updatedFieldsEvaluation],
    });
  };


  return (
    <GridContainer >
      <GridItem xs={6}>
        <form noValidate autoComplete='off'>
          <GridContainer>
            <GridItem className={classes.fieldsSectionTitle} xs={12}>
              <CustomTypography variant={'h6'} fontWeight={'bold'} >{t('Fields Of Experience')}</CustomTypography>
            </GridItem>
          </GridContainer>
          {consultantEvaluation?.fieldsRating?.map((field, key) => {
            return (
              <GridContainer key={field.id} className={classes.fieldsRatingSection}>
                <GridItem xs={4}>
                  <div key={key}>{field.label}</div>
                </GridItem>
                <GridItem xs={8}>
                  <RadioGroup
                    row
                    aria-label='position'
                    name='position'
                    value={field.rating}
                    onChange={(e) => handleFieldsEvaluation(e, 'rating', field.id)}>
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
                  <TextareaAutosize
                    rowsMin={2}
                    rowsMax={4}
                    cols={50}
                    className={classes.commentTextBox}
                    name='comment'
                    placeholder={t('comment')}
                    onChange={(e) => handleFieldsEvaluation(e, 'comment', field.id)}
                    value={field.comment}
                  />
                </GridItem>
              </GridContainer>
            );
          })}

          <GridContainer className={classes.consultantEvaluationSections}>
            <GridItem xs={4}>
              <InputLabel className={classes.formLabels} shrink>
                {t('hourlyRatedRequested')}
              </InputLabel>
            </GridItem>
            <GridItem xs={8}>
              <CurrencyTextField
                name='hourlyRate'
                label="Amount"
                variant="standard"
                value={consultantEvaluation.hourlyRate}
                currencySymbol="$"
                outputFormat="string"
                onChange={(e) =>
                  setConsultantEvaluation({
                    ...consultantEvaluation,
                    hourlyRate: e.target.value,
                  })
                }
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
                cols={50}
                className={classes.commentTextBox}
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
                aria-label='isApproved'
                value={consultantEvaluation.isApproved}
                onChange={(e) =>
                  setConsultantEvaluation({
                    ...consultantEvaluation,
                    isApproved: e.target.value,
                  })
                }
                name='isApproved'>
                <GridContainer>
                  <GridItem xs={6}>
                    <FormControlLabel
                      value={'t'}
                      control={<Radio color='primary' />}
                      label='Yes'
                      labelPlacement='end'
                    />
                  </GridItem>
                </GridContainer>
                <GridItem xs={6}>
                  <FormControlLabel
                    value={'f'}
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
      </GridItem>
    </GridContainer>
  );
};

const useStyles = makeStyles(() => ({
  fieldsSectionTitle: {
    marginBottom: 16
  },
  field: {
    margin: 2,
  },
  fieldsRatingSection: {
    marginBottom: 16
  },
  commentTextBox: {
    resize: 'none',
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

export default ConsultantEvaluationForm;
