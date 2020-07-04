import React, { Fragment } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Grid,
  Typography,
  Container,
  Box,
} from '@material-ui/core';

import CalendarView from './CalendarView';
import { CalendarProvider, useCalendarState } from './Context/CalendarContext';
import moment from 'moment';
import { UPDATE_SELECTED_TIME } from './Context/contextActions';
import AvailableTimePicker from './AvailableTimePicker';
import dateTimeParser from '../../services/dateTimeParser';
import Transition from '../../components/animations/Transition';

const dates = [
  {
    type: 'date',
    date: '2020-07-27',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-07-28',
    intervals: [
      {
        from: '09:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-07-29',
    intervals: [
      {
        from: '13:00',
        to: '17:00',
      },
    ],
  },
  {
    type: 'date',
    date: '2020-07-30',
    intervals: [
      {
        from: '09:00',
        to: '12:00',
      },
    ],
  },
];

const CalendarContent = ({ onClose, onSelectDate }) => {
  const [
    { selectedDay, isUpdatedTime, availableDates },
    dispatch,
  ] = useCalendarState();
  const selectedDayFormatted = !!selectedDay
    ? moment(selectedDay).format('DD-MM-YYYY')
    : null;

  const selectedDayTimeRange =
    !!selectedDay &&
    availableDates.filter((dateSlot) => {
      return dateTimeParser.isSameDate(dateSlot.date, selectedDay);
    })[0].intervals[0];
  const handleTimeChange = (selectedDateTime) => {
    dispatch({
      type: UPDATE_SELECTED_TIME,
      payload: selectedDateTime,
    });
  };

  return (
    <Fragment>
      <DialogTitle id='dialog-title'>
        {'Please pick available date to schedule the call'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs>
            <CalendarView />
          </Grid>
          <Grid item xs={4}>
            {selectedDay && (
              <Container>
                <Box>
                  <Typography variant='h6' align='center' color={'primary'}>
                    {`Your call will be in ${selectedDayFormatted}`}
                  </Typography>
                  <Typography variant='h6' align='center' color={'primary'}>
                    {isUpdatedTime && `at ${moment(selectedDay).format('LT')}`}
                  </Typography>
                </Box>
                <Box mt={8}>
                  <AvailableTimePicker
                    startTime={moment(
                      `${selectedDayFormatted} ${selectedDayTimeRange.from}`,
                      'DD-MM-YYYY hh:mm',
                    )}
                    endTime={moment(
                      `${selectedDayFormatted} ${selectedDayTimeRange.to}`,
                      'DD-MM-YYYY hh:mm',
                    )}
                    selectedTime={moment(selectedDay).toDate()}
                    handleTimeChange={handleTimeChange}
                  />
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
        <Button
          disabled={!isUpdatedTime}
          onClick={() => onSelectDate(selectedDay)}
          color='primary'
          autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Fragment>
  );
};

const CalendarDialog = ({ open, onClose, onSelectDate, availableDates }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <CalendarProvider initialValue={{ availableDates: availableDates }}>
        <CalendarContent onClose={onClose} onSelectDate={onSelectDate} />
      </CalendarProvider>
    </Dialog>
  );
};

export default CalendarDialog;
