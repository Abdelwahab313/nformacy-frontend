import React, { Fragment, useState, useEffect } from 'react';
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
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import { projectManagers } from 'constants/dropDownOptions';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import AutoCompleteSelectField from 'components/inputs/AutoCompleteSelectField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const AddProjectForm = ({
  primaryButton,
  project,
  setProject,
  richTextRef,
  options,
  initialRange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedRange, setSelectedRange] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const onChangeField = (name, checked) => {
    setProject((prevData) => ({ ...prevData, [name]: checked }));
  };

  const updateTime = (name, date) => {
    setSelectedRange((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  useEffect(() => {
    setSelectedRange(initialRange);
  }, [initialRange.startDate]);

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
                        value={selectedRange.startDate}
                        onChange={(date) => updateTime('startDate', date)}
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
                        value={selectedRange.endDate}
                        onChange={(date) => updateTime('endDate', date)}
                        minDate={selectedRange.startDate}
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
              <AutoCompleteSelectField
                id='countrySelect'
                name='countries'
                inputLabel={t('selectCountry')}
                options={options}
                value={project.countries}
                getOptionSelected={(option, selectedValue) => {
                  return option.value === selectedValue.value;
                }}
                onChange={(newValue) => {
                  onChangeField('countries', newValue);
                }}
                multiple
              />
            </FormControl>
          </GridItem>

          <GridItem
            xs={12}
            sm={12}
            md={6}
            className={classes.projectFormFields}>
            <FormControl fullWidth id='project-manager-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectProjectManager')}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={projectManagers}
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
                  onContentUpdate={(value) => onChangeField('content', value)}
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
