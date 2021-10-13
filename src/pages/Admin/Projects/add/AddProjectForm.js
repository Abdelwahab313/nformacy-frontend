import React, { Fragment } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import CardFooter from 'components/card/CardFooter';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CountrySelectField from 'components/inputs/CountrySelectField';
import ProjectManagerSelect from './ProjectManagerSelect';
import ErrorMessage from 'components/errors/ErrorMessage';
import ProjectGuardian from 'core/guardians/ProjectGuardian';

const AddProjectForm = ({
  primaryButton,
  project,
  setProject,
  errors,
  richTextRef,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onChangeField = (name, value) => {
    setProject((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Fragment>
      <CardBody>
        <GridContainer className={classes.inputsRow}>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            className={classes.projectFormFields}>
            <TextField
              required
              label={t('title')}
              id='title'
              name='title'
              error={!!errors?.title}
              fullWidth
              value={project.title}
              onChange={(e) => {
                onChangeField('title', e.target.value);
              }}
              variant='outlined'
            />
            <ErrorMessage
              className={classes.errorMessage}
              errorField={{ message: errors?.title }}
            />
          </GridItem>
          <GridItem xs={12} md={6}>
            <GridContainer>
              <GridItem className={classes.durationLabel} xs={3}>
                {t('requiredDuration')}
              </GridItem>
              <GridItem xs={9} className={classes.projectFormFields}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <DatePicker
                        disableToolbar
                        fullWidth
                        autoOk
                        variant='inline'
                        format='dd/MM/yyyy'
                        margin='normal'
                        id='start-date-range-picker'
                        placeholder='-select start date-'
                        label={t['startDate']}
                        value={project.startDate || null}
                        error={!!errors?.startDate}
                        onChange={(date) => onChangeField('startDate', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <ErrorMessage
                        className={classes.errorMessage}
                        errorField={{ message: errors?.startDate }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <DatePicker
                        disableToolbar
                        fullWidth
                        autoOk
                        variant='inline'
                        format='dd/MM/yyyy'
                        margin='normal'
                        id='end-date-range-picker'
                        placeholder='-select end date-'
                        label={t['endDate']}
                        value={project.endDate || null}
                        onChange={(date) => onChangeField('endDate', date)}
                        error={!!errors?.endDate}
                        minDate={project.startDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <ErrorMessage
                        className={classes.errorMessage}
                        errorField={{ message: errors?.endDate }}
                      />
                    </GridItem>
                  </GridContainer>
                </MuiPickersUtilsProvider>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={6}>
            <FormControl fullWidth id='country-select'>
              <CountrySelectField
                fieldValue={project.countries}
                fieldLabel={t('selectCountry')}
                onFieldChange={(newValue) => {
                  onChangeField('countries', newValue);
                }}
              />
            </FormControl>
          </GridItem>

          <GridItem
            xs={12}
            sm={12}
            md={6}
            className={classes.projectFormFields}>
            <FormControl fullWidth id='project-manager-select'>
              {ProjectGuardian.canChangeProjectManager() && (
                <ProjectManagerSelect
                  selectedProjectMangerId={project.projectManagerId}
                  onChangeProjectManagerId={(projectManagerId) =>
                    onChangeField('projectManagerId', projectManagerId)
                  }
                  error={!!errors?.projectManagerId}
                />
              )}
              <ErrorMessage
                className={classes.errorMessage}
                errorField={{ message: errors?.projectManagerId }}
              />
            </FormControl>
          </GridItem>
        </GridContainer>

        <FieldsSelect
          initialFields={project.fields}
          updateFields={(newOptions) => {
            onChangeField('fields', newOptions);
          }}>
          {({ MajorField, Field }) => (
            <GridContainer className={classes.inputsRow}>
              <GridItem
                xs={12}
                sm={12}
                md={6}
                className={classes.projectFormFields}>
                <MajorField />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={6}
                className={classes.projectFormFields}>
                <Field />
              </GridItem>
            </GridContainer>
          )}
        </FieldsSelect>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.contentTitle}>
              {t('details')}
            </InputLabel>
            <GridContainer className={classes.questionContainer}>
              <GridItem xs={12}>
                <RichTextEditorForm
                  initialContent={project?.details || ''}
                  onContentUpdate={(value) => onChangeField('details', value)}
                  updateRichTextMedia={(newRichTextMediaId) =>
                    onChangeField('richTextMediaId', newRichTextMediaId)
                  }
                  richTextRef={richTextRef}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer primaryButton={primaryButton} />
      </CardFooter>
    </Fragment>
  );
};

export default AddProjectForm;
