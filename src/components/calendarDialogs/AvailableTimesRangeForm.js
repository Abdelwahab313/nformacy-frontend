import React from 'react';
import Box from '@material-ui/core/Box';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import t from '../../locales/en/freelancerProfile.json';


const AvailableTimeRangeForm = ({ selectedRange, setSelectedRange }) => {

  return (<Box>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
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
            onChange={(date) => setSelectedRange(prevState => ({ ...prevState, startDate: date }))}
            // minDate={
            //   new Date(watchExperiences[index].startDate)
            // }
            // maxDate={Date.now()}
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
            onChange={(date) => setSelectedRange(prevState => ({ ...prevState, endDate: date }))}
            minDate={
              new Date(selectedRange.startDate)
            }
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  </Box>);
};

AvailableTimeRangeForm.propTypes = {
  selectedRange: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
  }),
  setSelectedRange: PropTypes.func,
};

export default AvailableTimeRangeForm;
