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
import TextField from '@material-ui/core/TextField';

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
    debugger;
    const isValidEndTime = selectedRange.startTime.isBefore(date);
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
              <form className={classes.container}>
                <TextField
                  id='start-time-range-picker'
                  label='Start time'
                  type='time'
                  defaultValue={moment(selectedRange?.startTime).format(
                    'HH:mm',
                  )}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={(e) => {
                    const time = new moment(e.target.value, 'HH:mm');
                    updateTime('startTime', time);
                  }}
                />
              </form>
            </Grid>
            <Grid item xs>
              <form className={classes.container}>
                <TextField
                  id='end-time-range-picker'
                  label='End time'
                  type='time'
                  defaultValue={moment(selectedRange?.endTime).format('HH:mm')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={(e) => {
                    const time = new moment(e.target.value, 'HH:mm');
                    console.log('888888888', time);
                    handleEndTime(time);
                  }}
                />
              </form>
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default AvailableTimeRangeForm;
