import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import CalendarView from '../calendar/CalendarView';
import MeetingTimePicker from './MeetingTimePicker';
import dateTimeParser from '../../services/dateTimeParser';
import Transition from '../animations/Transition';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from '../buttons/SubmitButton';

const MeetingTimeSelectorCalendarDialog = ({ open, onClose, onSelectDate, availableDates }) => {
  const classes = useStyles();
  const [localState, setLocalState] = useState({ selectedDay: '', isUpdatedTime: false });

  const selectedDayFormatted = !!localState.selectedDay
    ? moment(localState.selectedDay).format('DD-MM-YYYY')
    : null;

  const selectedDayTimeRange =
    !!localState.selectedDay &&
    availableDates.filter((dateSlot) => {
      return dateTimeParser.isSameDate(dateSlot.date, localState.selectedDay);
    })[0].intervals[0];

  const handleTimeChange = (selectedDateTime) => {
    setLocalState((previousLocalState) => ({
      ...previousLocalState,
      isUpdatedTime: true,
      selectedDay: selectedDateTime,
    }));
  };
  const setSelectedDay = (selectedDateTime) => {
    setLocalState((previousLocalState) => ({
      ...previousLocalState,
      isUpdatedTime: false,
      selectedDay: selectedDateTime,
    }));
  };

  const selectedTimeText = localState.isUpdatedTime && `at ${moment(localState.selectedDay).format('LT')}`;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>

      <Fragment>
        <DialogTitle id='dialog-title'>
          {'Please Pick Available Date to Schedule the Call'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className={classes.dialogMargin}>
            <Grid item xs={1}/>
            <Grid item xs>
              <CalendarView availableDates={availableDates} isInteractable selectedDay={localState.selectedDay}
                            setSelectedDay={setSelectedDay}/>
            </Grid>
            <Grid container direction={'column'} justify={'space-between'} alignItems={'center'} xs={4}>
              <Grid item>
                {localState.selectedDay && (
                  <Fragment>
                    <Box>
                      <Typography variant='h6' align='center'>
                        {`Your call will be in ${selectedDayFormatted}`}
                      </Typography>
                      <Typography variant='h6' align='center'>
                        {selectedTimeText}
                      </Typography>
                    </Box>
                    <Box mt={8}>
                      <MeetingTimePicker
                        startTime={moment(
                          `${selectedDayFormatted} ${selectedDayTimeRange.from}`,
                          'DD-MM-YYYY hh:mm',
                        )}
                        endTime={moment(
                          `${selectedDayFormatted} ${selectedDayTimeRange.to}`,
                          'DD-MM-YYYY hh:mm',
                        )}
                        selectedTime={moment(localState.selectedDay).toDate()}
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
                  disabled={!localState.isUpdatedTime}
                  onClick={() => onSelectDate(localState.selectedDay)}
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
}));

export default MeetingTimeSelectorCalendarDialog;