import React, { Fragment, useState } from 'react';
import humanizedTimeSpan from 'services/humanizedTimeSpan';
import GridItem from 'components/grid/GridItem';
import CustomInput from 'components/inputs/CustomInput';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import CardFooter from 'components/card/CardFooter';
import ActionButtonsContainer from 'components/buttons/ActionButtonsContainer';
import GridContainer from 'components/grid/GridContainer';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const AddAccountForm = ({ primaryButton, user, setUser }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isNewForm = !user.id;
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onChangeField = (name, value) => {
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Fragment>
      <CardBody>
        <GridContainer>
          {!isNewForm && (
            <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                labelText={t('referenceId')}
                id='reference-id'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: user.referenceNumber,
                  name: 'referenceNumber',
                  disabled: true,
                }}
              />
            </GridItem>
          )}
          {!isNewForm && (
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText={t('postDate')}
                id='post-date'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: humanizedTimeSpan(user.createdAt),
                  name: 'createdAt',
                  disabled: true,
                }}
              />
            </GridItem>
          )}
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              required
              label={t('firstName')}
              id='firstName'
              name='firstName'
              fullWidth
              value={user.firstName}
              onChange={(e) => {
                onChangeField('firstName', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              required
              label={t('lastName')}
              id='lastName'
              name='lastName'
              fullWidth
              value={user.lastName}
              onChange={(e) => {
                onChangeField('lastName', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              required
              label={t('email')}
              id='email'
              name='email'
              fullWidth
              value={user.email}
              onChange={(e) => {
                onChangeField('email', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={12} md={6}>
            <TextField
              required
              label={t('jobTitle')}
              id='jobTitle'
              name='jobTitle'
              fullWidth
              value={user.jobTitle}
              onChange={(e) => {
                onChangeField('jobTitle', e.target.value);
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.addAccountDate}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label={t('addDate')}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <ActionButtonsContainer primaryButton={primaryButton} />
      </CardFooter>
    </Fragment>
  );
};

export default AddAccountForm;
