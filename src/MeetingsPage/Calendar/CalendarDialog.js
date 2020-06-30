import React, { Fragment } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Grid,
  Typography,
  Slide,
  Container,
  Box,
} from '@material-ui/core';

import CalendarView from './CalendarView';
import { CalendarProvider, useCalendarState } from './Context/CalendarContext';
import moment from 'moment';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { UPDATE_SELECTED_TIME } from './Context/contextActions';

const dates = [
  {
    type: 'date',
    date: '2020-06-27',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-28',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-29',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-06-30',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CalendarDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please pick available date to schedule the call'}
      </DialogTitle>
      <CalendarProvider initialValue={{ availableDates: dates }}>
        <CalendarContent onClose={onClose} />
      </CalendarProvider>
    </Dialog>
  );
};

export default CalendarDialog;

const CalendarContent = ({ onClose }) => {
  const [{ selectedDay }, dispatch] = useCalendarState();
  const slectedDayFormatted = selectedDay
    ? moment(selectedDay).format('DD-MM-YYYY')
    : null;

  const handleTimeChange = (selectedDateTime) => {
    dispatch({
      type: UPDATE_SELECTED_TIME,
      payload: selectedDateTime,
    });
  };
  return (
    <Fragment>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography>Jonas Adam</Typography>
          </Grid>
          <Grid item xs>
            <CalendarView />
          </Grid>
          <Grid item xs={4}>
            {selectedDay && (
              <Container>
                <Box>
                  <Typography variant='h5' align='center' color={'primary'}>
                    {slectedDayFormatted}
                  </Typography>
                </Box>
                <Box mt={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      autoOk
                      minutesStep={5}
                      variant='static'
                      allowKeyboardControl
                      openTo='hours'
                      label='Select Time'
                      value={selectedDay}
                      onChange={handleTimeChange}
                    />
                  </MuiPickersUtilsProvider>
                </Box>
              </Container>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => onClose()} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Fragment>
  );
};
