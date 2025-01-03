import React, { Fragment, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import SubmitButton from '../../buttons/SubmitButton';
import TextField from '@material-ui/core/TextField';

const AvailableTimeRangeForm = ({
  initialRange,
  cancelDateForm,
  onAvailableRangeAdded,
}) => {
  const classes = useStyles();
  const [errors, setErrors] = useState({ endTime: '' });
  const [selectedRange, setSelectedRange] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    setSelectedRange(initialRange);
  }, [initialRange.startDate]);

  const updateTime = (name, date) => {
    setSelectedRange((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };
  const { t } = useTranslation();

  const handleEndTime = (newEndDate) => {
    setErrors({ endTime: '' });
    const isValidEndTime = moment(selectedRange.startTime).isBefore(
      moment(newEndDate),
    );
    if (isValidEndTime) {
      updateTime('endTime', newEndDate);
    } else {
      setErrors({ endTime: t('endTimeShouldBeBeforeStart') });
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
                label={t('startDate')}
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
                label={t('endDate')}
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
                  label={t('StartTime')}
                  type='time'
                  value={moment(selectedRange?.startTime).format('HH:mm')}
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
                  label={t('EndTime')}
                  type='time'
                  value={moment(selectedRange?.endTime).format('HH:mm')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
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
          {t('cancel')}
        </Button>
        <SubmitButton
          id={'confirm'}
          onClick={() => onAvailableRangeAdded(selectedRange)}
          size='large'
          className={classes.margin}
          buttonText={t('confirm')}
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
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      margin: '0 auto'
    }
  },
  deleteAvailableDayButton: {
    alignSelf: 'flex-start',
  },
  redFont: {
    color: 'red',
  },
  margin: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: '8px 16px'
    }
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
