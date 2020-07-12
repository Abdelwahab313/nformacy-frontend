import React, { Fragment } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';

import CalendarView from './CalendarView';
import { CalendarProvider, useCalendarState } from './Context/CalendarContext';
import moment from 'moment';
import { UPDATE_SELECTED_TIME } from './Context/contextActions';
import AvailableTimePicker from './AvailableTimePicker';
import dateTimeParser from '../../services/dateTimeParser';
import Transition from '../../components/animations/Transition';
import { makeStyles } from '@material-ui/core/styles';
import { lighterPink, pink } from '../../styles/colors';
import SubmitButton from '../../components/buttons/SubmitButton';

const CalendarContent = ({ onClose, onSelectDate }) => {
  const classes = useStyles();
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

  const selectedTimeText = isUpdatedTime && `at ${moment(selectedDay).format('LT')}`;

  return (
    <Fragment>
      <DialogTitle id='dialog-title'>
        {'Please Pick Available Date to Schedule the Call'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className={classes.dialogMargin}>
          <Grid item xs={1}/>
          <Grid item xs>
            <CalendarView/>
          </Grid>
          <Grid container direction={'column'} justify={'space-between'} alignItems={'center'} xs={4}>
            <Grid item>
              {selectedDay && (
                <Fragment>
                  <Box>
                    <Typography variant='h6' align='center'>
                      {`Your call will be in ${selectedDayFormatted}`}
                    </Typography>
                    <Typography variant='h6' align='center'>
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
                </Fragment>
              )}
            </Grid>
            <Grid item justify={'space-evenly'} className={classes.buttonContainer}>
              <Button
                variant="contained"
                size="large"
                className={classes.margin}
                onClick={() => onClose()}>
                Cancel
              </Button>
              <SubmitButton
                disabled={!isUpdatedTime}
                onClick={() => onSelectDate(selectedDay)}
                variant="contained"
                size="large"
                className={classes.margin}
                autoFocus
                buttonText={'Confirm'}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
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
        <CalendarContent onClose={onClose} onSelectDate={onSelectDate}/>
      </CalendarProvider>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
  },
  margin: {
    margin: theme.spacing(1),
  },
  dialogMargin: {
    marginBottom: theme.spacing(2),
  },
  containedPrimary: {
    backgroundColor: pink,
  },
  disabled: {
    backgroundColor: lighterPink,
  },
}));

export default CalendarDialog;
