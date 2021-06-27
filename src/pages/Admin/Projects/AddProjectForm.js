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
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import countryList from 'react-select-country-list';
import moment from 'moment';
import { projectManagers } from 'constants/dropDownOptions';
import CreatableSelect from 'react-select/creatable';

const AddProjectForm = ({ primaryButton, user, setUser }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [countries] = useState(countryList().getData());
  const [errors, setErrors] = useState({ endTime: '' });

  const [selectedRange, setSelectedRange] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const onChangeField = (name, checked) => {
    setUser((prevData) => ({ ...prevData, [name]: checked }));
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
          <GridItem xs={12} sm={12} md={6}>
            <TextField
              required
              label={t('title')}
              id='title'
              name='title'
              fullWidth
              value={user.title}
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
              <GridItem xs={4}>
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
              <GridItem xs={4}>
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
          <GridItem xs={12}>
            <TextField
              required
              label={t('details')}
              id='details'
              multiline
              rowsMin={3}
              rowsMax={6}
              name='details'
              fullWidth
              value={user.details}
              onChange={(e) => {
                onChangeField('details', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12}>
            <FormControl fullWidth id='country-select'>
              <CreatableSelect
                fullWidth={true}
                placeholder={t('selectCountryMessage')}
                SelectProps={{
                  styles: selectStyle,
                }}
                isMulti
                options={countries}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
        <FieldsSelect
          initialFields={user.fields}
          updateFields={(newOptions) => {
            onChangeField('fields', newOptions);
          }}>
          {({ MajorField, Field }) => (
            <GridContainer className={classes.inputsRow}>
              <GridItem xs={12} sm={12} md={4}>
                <MajorField />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Field />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl fullWidth id='country-select'>
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
          )}
        </FieldsSelect>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer primaryButton={primaryButton} />
      </CardFooter>
    </Fragment>
  );
};

export default AddProjectForm;
