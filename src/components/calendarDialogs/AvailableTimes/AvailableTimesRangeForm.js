import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid } from '@material-ui/core';
import t from '../../../locales/en/freelancerProfile.json';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SubmitButton from '../../buttons/SubmitButton';

const AvailableTimeRangeForm = ({
  selectedRange,
  setSelectedRange,
  cancelDateForm,
  handleAddRangeClicked,
}) => {
  const classes = useStyles();
  const [errors, setErrors] = useState({ endTime: '' });
  const updateTime = (name, date) => {
    setSelectedRange((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleEndTime = (date) => {
    setErrors({ endTime: '' });
    const isValidEndTime = moment(selectedRange.startTime).isBefore(date);
    if (isValidEndTime) {
      updateTime('endTime', date);
    } else {
      setErrors({ endTime: 'End time should be after start time' });
    }
  };
  return (
    <Fragment>
      <Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid className={classes.pickerRow} container spacing={2}>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
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
            </Grid>
          </Grid>
          <Grid className={classes.pickerRow} container spacing={2}>
            <Grid item xs>
              <KeyboardTimePicker
                id='start-time-range-picker'
                autoOk
                variant='inline'
                minutesStep={5}
                label='Start time'
                keyboardIcon={<AccessAlarmIcon />}
                value={selectedRange.startTime}
                onChange={(date) => updateTime('startTime', date)}
              />
            </Grid>
            <Grid item xs>
              <KeyboardTimePicker
                id='end-time-range-picker'
                autoOk
                keyboardIcon={<AccessAlarmIcon />}
                variant='inline'
                minutesStep={5}
                label='End time'
                minDate={selectedRange.startTime}
                value={selectedRange.endTime}
                onChange={handleEndTime}
              />
              {!!errors.endTime && (
                <Typography
                  variant={'body2'}
                  style={{
                    color: 'red',
                  }}>
                  {errors.endTime}
                </Typography>
              )}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Box>

      <Grid className={classes.buttonContainer}>
        <Button
          variant='contained'
          size='large'
          className={classes.margin}
          onClick={cancelDateForm}>
          Cancel
        </Button>
        <SubmitButton
          id={'confirm'}
          onClick={handleAddRangeClicked}
          size='large'
          className={classes.margin}
          buttonText={t['confirm']}
        />
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  pickerRow: {
    marginBottom: theme.spacing(6),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
  },
  deleteAvailableDayButton: {
    alignSelf: 'flex-start',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default AvailableTimeRangeForm;
