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
import { formatDayAsKey } from '../../../services/dateTimeParser';
import Transition from '../../animations/Transition';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from '../../buttons/SubmitButton';
import { scheduleMeeting } from 'apis/meetingsAPI';
import { useSnackBar } from 'context/SnackBarContext';
import { getUserName } from 'core/user';

const MeetingTimeSelectorCalendarDialog = ({
  open,
  onClose,
  serviceId,
  candidate,
}) => {
  const classes = useStyles();
  const [localState, setLocalState] = useState({
    selectedDay: '',
    isUpdatedTime: false,
  });

  const { showSuccessMessage } = useSnackBar();

  const selectedDayTimeRange =
    !!localState.selectedDay &&
    candidate?.freeDates[formatDayAsKey(localState.selectedDay)].intervals;

  const handleTimeChange = (selectedDateTime) => {
    setLocalState((previousLocalState) => ({
      ...previousLocalState,
      isUpdatedTime: true,
      selectedDay: selectedDateTime,
    }));
  };
  const handleSelectDay = ({ selectedDay, isAvailableDay }) => {
    // console.log(selectedDay, isAvailableDay);
    if (isAvailableDay) {
      setLocalState((previousLocalState) => ({
        ...previousLocalState,
        isUpdatedTime: false,
        selectedDay: selectedDay,
      }));
    }
  };

  const onSelectDate = () => {
    scheduleMeeting(serviceId, candidate.id, localState.selectedDay).then(
      () => {
        showSuccessMessage(
          `Meeting has been scheduled successfully with ${getUserName(
            candidate,
          )}`,
        );
      },
    );
    onClose();
  };

  // console.log('availableDates ----------------', candidate?.freeDates);

  const selectedDayFormatted =
    !!localState.selectedDay &&
    moment(localState.selectedDay).format('DD-MM-YYYY');
  const selectedTimeText =
    localState.isUpdatedTime &&
    `at ${moment(localState.selectedDay).format('LT')}`;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please Pick Available Date to Schedule the Call'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className={classes.dialogMargin}>
          <Grid item xs={1} />
          <Grid item xs>
            <CalendarView
              availableDates={!!candidate.freeDates ? candidate.freeDates : []}
              isInteractable
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
                disabled={!localState.isUpdatedTime}
                onClick={() => onSelectDate(localState.selectedDay)}
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
