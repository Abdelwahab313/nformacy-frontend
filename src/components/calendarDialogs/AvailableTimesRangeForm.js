import React from 'react';
import Box from '@material-ui/core/Box';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import t from '../../locales/en/freelancerProfile.json';
import { makeStyles } from '@material-ui/core/styles';


const AvailableTimeRangeForm = ({ selectedRange, setSelectedRange }) => {
  const classes = useStyles();

  const updateTime = (name, date) => {
    setSelectedRange(prevState => (
      {
        ...prevState,
        [name]: date,
      }
    ));
  };

  return (<Box>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className={classes.pickerRow} container spacing={2}>
        <Grid item xs>
          <KeyboardDatePicker
            disableToolbar
            autoOk
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="start-date-range-picker"
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
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="end-date-range-picker"
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
            id="start-time-range-picker"
            autoOk
            variant="inline"
            minutesStep={5}
            label="start time"
            value={selectedRange.startTime}
            onChange={(date) => updateTime('startTime', date)}
          />
        </Grid>
        <Grid item xs>
          <KeyboardTimePicker
            id="end-time-range-picker"
            autoOk
            variant="inline"
            minutesStep={5}
            label="end time"
            minDate={selectedRange.startTime}
            value={selectedRange.endTime}
            onChange={(date) => updateTime('endTime', date)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  </Box>);
};


const useStyles = makeStyles((theme) => ({
  pickerRow: {
    marginBottom: theme.spacing(8),
  },
}));

export default AvailableTimeRangeForm;
