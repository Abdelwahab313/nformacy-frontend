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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CountrySelectField from 'components/inputs/CountrySelectField';
import ProjectManagerSelect from './ProjectManagerSelect';

const AddProjectForm = ({
  primaryButton,
  project,
  setProject,
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
              fullWidth
              value={project.title}
              onChange={(e) => {
                onChangeField('title', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} md={6}>
            <GridContainer>
              <GridItem className={classes.durationLabel} xs={3}>
                {t('duration')}
              </GridItem>
              <GridItem xs={9} className={classes.projectFormFields}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant='inline'
                        format='dd/MM/yyyy'
                        margin='normal'
                        id='start-date-range-picker'
                        label={t['startDate']}
                        value={project.startDate}
                        onChange={(date) => onChangeField('startDate', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant='inline'
                        format='dd/MM/yyyy'
                        margin='normal'
                        id='end-date-range-picker'
                        label={t['endDate']}
                        value={project.endDate}
                        onChange={(date) => onChangeField('endDate', date)}
                        minDate={project.startDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
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
              <ProjectManagerSelect
                selectedProjectMangerId={project.projectManagerId}
                onChangeProjectManagerId={(projectManagerId) =>
                  onChangeField('projectManagerId', projectManagerId)
                }
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
