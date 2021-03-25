import React, { Fragment, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import CalendarView from '../../calendar/CalendarView';
import MeetingTimePicker from './MeetingTimePicker';
import { formatDayAsKey } from 'services/dateTimeParser';
import Transition from '../../animations/Transition';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from '../../buttons/SubmitButton';

const MeetingTimeSelectorCalendarDialog = ({
  open,
  onClose,
  onSubmitDate,
  candidate,
}) => {
  const classes = useStyles();
  const [localState, setLocalState] = useState({
    selectedDay: '',
    selectedTime: '',
    isUpdatedTime: false,
  });

  const selectedDayTimeSlots =
    !!localState.selectedDay &&
    !!candidate.freeDates &&
    candidate.freeDates[localState.selectedDay];

  const handleTimeChange = (selectedDateTime) => {
    setLocalState((previousLocalState) => ({
      ...previousLocalState,
      isUpdatedTime: true,
      selectedTime: selectedDateTime,
    }));
  };

  const handleSelectDay = ({ selectedDay, isAvailableDay }) => {
    const isValidDay = moment(selectedDay).isAfter();
    if (isAvailableDay && !!isValidDay) {
      setLocalState((previousLocalState) => ({
        ...previousLocalState,
        isUpdatedTime: false,
        selectedDay: formatDayAsKey(selectedDay),
      }));
    }
  };

  const selectedDayFormatted =
    !!localState.selectedDay &&
    moment(localState.selectedDay).format('DD-MM-YYYY');
  const selectedTimeText =
    localState.isUpdatedTime &&
    `at ${moment(localState.selectedTime).format('LT')}`;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please Pick a time to Schedule the Call'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className={classes.dialogMargin}>
          <Grid item xs={1} />
          <Grid item xs>
            <CalendarView
              availableDates={!!candidate.freeDates ? candidate.freeDates : []}
              canBookDate
              selectedDay={localState.selectedDay}
              onDayClick={handleSelectDay}
            />
          </Grid>
          <Grid
            container
            direction={'column'}
            justify={'space-between'}
            alignItems={'center'}
            xs={4}>
            <Grid item>
              {!!localState.selectedDay && !!selectedDayTimeSlots.length > 0 && (
                <Fragment>
                  <Box id={'meetingTimePickerContainer'}>
                    <Typography variant='h6' align='center'>
                      {`Your call will be in ${selectedDayFormatted}`}
                    </Typography>
                    <Typography variant='h6' align='center'>
                      {selectedTimeText}
                    </Typography>
                  </Box>
                  <Box mt={8}>
                    <MeetingTimePicker
                      selectedDay={localState.selectedDay}
                      selectedDayTimeSlots={selectedDayTimeSlots}
                      selectedTime={moment(localState.selectedDay).toDate()}
                      handleTimeChange={handleTimeChange}
                    />
                  </Box>
                </Fragment>
              )}
            </Grid>
            <Grid
              item
              justify={'space-evenly'}
              className={classes.buttonContainer}>
              <Button
                variant='contained'
                size='large'
                className={classes.margin}
                onClick={() => onClose()}>
                Cancel
              </Button>
              <SubmitButton
                id={'confirmBtnCalendar'}
                disabled={!localState.isUpdatedTime}
                onClick={() => onSubmitDate(localState.selectedTime)}
                variant='contained'
                size='large'
                className={classes.margin}
                autoFocus
                buttonText={'Confirm'}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
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
