import React, { Fragment, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import CardFooter from 'components/card/CardFooter';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import { InputLabel, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import moment from 'moment';
import { projectManagers } from 'constants/dropDownOptions';
import RichTextEditorForm from 'components/forms/RichTextEditorForm';
import AutoCompleteSelectField from 'components/inputs/AutoCompleteSelectField';

const AddProjectForm = ({
  primaryButton,
  project,
  setProject,
  richTextRef,
  options,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({ endTime: '' });

  const [selectedRange, setSelectedRange] = useState({
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

  const handleEndTime = (newEndDate) => {
    setErrors({ endTime: '' });
    const isValidEndTime = moment(selectedRange.startTime).isBefore(
      moment(newEndDate),
    );
    if (isValidEndTime) {
      updateTime('endTime', newEndDate);
    } else {
      setErrors({ endTime: 'End time should be after start time' });
    }
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
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer spacing={2}>
              <GridItem className={classes.durationLabel} xs={4}>
                {t('duration')}
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.projectFormFields}>
                <form className={classes.container}>
                  <TextField
                    id='start-time-range-picker'
                    label='From'
                    type='time'
                    value={moment(selectedRange?.startTime).format('HH:mm')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    onChange={(e) => {
                      const time = new moment(e.target.value, 'HH:mm');
                      updateTime('startTime', time);
                    }}
                  />
                </form>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <form className={classes.container}>
                  <TextField
                    id='end-time-range-picker'
                    label='To'
                    type='time'
                    value={moment(selectedRange?.endTime).format('HH:mm')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    onChange={(e) => {
                      const time = new moment(e.target.value, 'HH:mm');
                      handleEndTime(time);
                    }}
                  />
                </form>
                {!!errors.endTime && (
                  <Typography variant={'body2'} className={classes.redFont}>
                    {errors.endTime}
                  </Typography>
                )}
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
