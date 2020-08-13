import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarView from '../../calendar/CalendarView';
import Transition from '../../animations/Transition';
import SelectTimeZone from '../../inputs/SelectTimeZone';
import Box from '@material-ui/core/Box';
import AvailableTimeRangeForm from './AvailableTimesRangeForm';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import t from '../../../locales/en/freelancerProfile.json';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import {
  formatDayAsKey,
  getTimeAtTimeZone,
} from '../../../services/dateTimeParser';
import { updateProfile } from '../../../apis/userAPI';
import { useAuth } from '../../../pages/auth/context/auth';
import { updateUser } from '../../../pages/auth/context/authActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';

const AvailableTimesCalendarDialog = ({ open, closeDialog, onSubmit }) => {
  const classes = useStyles();
  const [{ currentUser }, dispatch] = useAuth();
  const [availableDates, setAvailableDates] = useState(
    !!currentUser.freeDates ? currentUser.freeDates : [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [timeSlotVisible, setTimeSlotVisible] = useState(false);
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const onChangeTimeZone = (timezone) => {
    setSelectedRange((previousLocalState) => ({
      ...previousLocalState,
      timeZone: timezone,
    }));
    const { startDate } = selectedRange;
    handleDayClicked({
      selectedDay: startDate,
      isAvailableDay: availableDates.hasOwnProperty(formatDayAsKey(startDate)),
    });
  };

  const handleDayClicked = ({ selectedDay, isAvailableDay }) => {
    if (isAvailableDay) {
      const availableDayObject = availableDates[formatDayAsKey(selectedDay)];
      setSelectedRange((previousLocalState) => ({
        ...previousLocalState,
        startDate: selectedDay,
        endDate: selectedDay,
        startTime: getTimeAtTimeZone(
          availableDayObject.intervals.from,
          previousLocalState.timeZone,
        ),
        endTime: getTimeAtTimeZone(
          availableDayObject.intervals.to,
          previousLocalState.timeZone,
        ),
      }));
      setBookFormVisible(false);
      setTimeSlotVisible(true);
    } else {
      setBookFormVisible(false);
      setTimeSlotVisible(false);
      setSelectedRange((previousLocalState) => ({
        ...previousLocalState,
        startDate: selectedDay,
        endDate: selectedDay,
        startTime: moment(selectedDay).set('hour', 8),
        endTime: moment(selectedDay).set('hour', 17),
      }));
    }
  };

  const handleDeleteAvailableDay = () => {
    const updatedAvailableDates = { ...availableDates };
    const selectedDays = Object.keys(getAddedDate(selectedRange));
    selectedDays.forEach((formattedDay) => {
      if (formattedDay in updatedAvailableDates) {
        delete updatedAvailableDates[formattedDay];
      }
    });
    updateAvailableDays(updatedAvailableDates, cancelDateForm);
  };

  const handleAddRangeClicked = () => {
    const selectedAvailableDays = getAddedDate(selectedRange);
    debugger;
    const newAvailableDays = [...availableDates, selectedAvailableDays];
    updateAvailableDays(newAvailableDays);
  };

  const getAddedDate = (selectedRange) => {
    let { startDate, endDate, startTime, endTime } = selectedRange;
    const addedDateId =
      currentUser.freeDates.length === 0
        ? 0
        : currentUser.freeDates[currentUser.freeDates.length - 1].id;
    startDate = moment(startDate);
    endDate = moment(endDate);
    startTime = moment(startTime);
    endTime = moment(endTime);
    const startTimeString = startTime.format('HH:mm');
    const endTimeString = endTime.format('HH:mm');
    return {
      id: addedDateId,
      title: `${startTimeString} - ${endTimeString}`,
      startDate: new Date(
        startDate.year(),
        startDate.month(),
        startDate.date(),
        startTime.hour(),
        startTime.minutes(),
      ),
      endDate: new Date(
        endDate.year(),
        endDate.month(),
        endDate.date(),
        endTime.hour(),
        endTime.minutes(),
      ),
    };
  };

  const adaptDates = (dates) => {
    return dates.map((date) => ({
      ...dates,
      startDate: new Date(date.startDate),
      endDate: new Date(date.endDate),
    }));
  };
  const updateAvailableDays = (updatedAvailableDays, onSuccess) => {
    setIsLoading(true);
    updateProfile({ freeDates: updatedAvailableDays }, currentUser.id)
      .then((response) => {
        debugger;
        const userData = {
          ...response.data,
          ...adaptDates(response.data.freeDates),
        };
        updateUser(dispatch, userData);
        setAvailableDates([ ...updatedAvailableDays ]);
        onSuccess && onSuccess();
      })
      .finally(() => {
        setIsLoading(false);
        setBookFormVisible(false);
      });
  };

  const cancelDateForm = () => {
    setSelectedRange((prevState) => ({ ...prevState, startDate: '' }));
    setBookFormVisible(false);
  };

  const handleOnBookNowClicked = () => {
    setBookFormVisible(true);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'update-calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        <Grid container justify={'space-between'}>
          <Grid item>
            <Typography variant={'h6'}>{t['updateCalendarTitle']}</Typography>

            <Button
              variant='contained'
              color='primary'
              onClick={handleOnBookNowClicked}
              className={classes.timeOption}
              startIcon={<AccessAlarmIcon />}>
              Add/Update available time
            </Button>
            {timeSlotVisible && (
              <Button
                variant='contained'
                color='primary'
                className={classes.timeOption}
                startIcon={<Icon>add</Icon>}>
                Add time slot
              </Button>
            )}
          </Grid>
          <Grid item>
            <IconButton
              id={'close-dialog'}
              aria-label='edit'
              onClick={() => {
                setTimeSlotVisible(false);
                setBookFormVisible(false);
                closeDialog();
              }}>
              <CloseIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} className={classes.dialogMargin}>
          <Grid item xs>
            <CalendarView
              onDayClick={handleDayClicked}
              containerStyle={classes.cardBorder}
              availableDates={availableDates}
            />
            <Box mt={3}>
              <SelectTimeZone
                timezoneName={selectedRange.timeZone}
                onChange={onChangeTimeZone}
              />
            </Box>
          </Grid>

          <Grid container direction={'column'} alignItems={'center'} xs={5}>
            {!!isLoading && (
              <CircularProgress variant='indeterminate' size={50} />
            )}
            {bookFormVisible && !isLoading && (
              <AvailableTimeRangeForm
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                handleAddRangeClicked={handleAddRangeClicked}
                handleDeleteAvailableDay={handleDeleteAvailableDay}
                cancelDateForm={cancelDateForm}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
  },
  deleteAvailableDayButton: {
    alignSelf: 'flex-start',
  },
  timeOption: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  cardBorder: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  dialogMargin: {
    marginBottom: theme.spacing(2),
  },
}));

export default AvailableTimesCalendarDialog;
