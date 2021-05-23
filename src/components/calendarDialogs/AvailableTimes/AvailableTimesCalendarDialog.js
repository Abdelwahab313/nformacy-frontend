import React, { useCallback, useMemo, useState } from 'react';
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
import authManager from 'services/authManager';
import { addSelectedRangeToAvailableDays } from 'core/userAvailableDays';
import CalendarLegend from '../CalendarLegend';

const AvailableTimesCalendarDialog = ({ open, closeDialog }) => {
  const classes = useStyles();
  const [{ currentUser }, dispatch] = useAuth();

  const getInitialAvailableDates = () => {
    if (!!currentUser.freeDates && !(currentUser.freeDates instanceof Array)) {
      return currentUser.freeDates;
    } else {
      return {};
    }
  };
  const [availableDates, setAvailableDates] = useState(
    getInitialAvailableDates,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [timeSlotVisible, setTimeSlotVisible] = useState(false);
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const defaultTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );
  const [initialRange, setInitialRange] = useState({
    timeZone: defaultTimeZone,
    startDate: moment(),
    endDate: moment(),
    startTime: moment('08:00', 'HH:mm'),
    endTime: moment('17:00', 'HH:mm'),
  });

  const onAvailableRangeAdded = useCallback(
    (selectedRange) => {
      const selectedAvailableDays = addSelectedRangeToAvailableDays(
        availableDates,
        selectedRange,
      );
      const newAvailableDays = { ...selectedAvailableDays };
      updateAvailableDays(newAvailableDays);
    },
    [availableDates],
  );

  if (availableDates instanceof Array) {
    // TODO needs to handle if legacy available dates system
    alert('You have old available days format');
    closeDialog();
  }

  const onChangeTimeZone = () => {
    // if (!!currentUser.freeDates) {
    //   // TODO change freedates to handle object instead of list
    //   const availableDatesTZ = currentUser.freeDates?.map((availableDate) =>
    //     getTimeSlotAtTimeZone(availableDate, timezone),
    //   );
    //   setAvailableDates(availableDatesTZ);
    // }
  };

  const handleDayClicked = ({ selectedDay, isAvailableDay }) => {
    if (isAvailableDay) {
      const availableDayObject = availableDates[formatDayAsKey(selectedDay)];
      setInitialRange((previousLocalState) => ({
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
      setInitialRange((previousLocalState) => ({
        ...previousLocalState,
        startDate: selectedDay,
        endDate: selectedDay,
        startTime: moment('08:00', 'HH:mm'),
        endTime: moment('17:00', 'HH:mm'),
      }));
    }
  };

  const updateAvailableDays = (updatedAvailableDays) => {
    setIsLoading(true);
    updateProfile({ freeDates: updatedAvailableDays }, currentUser.id)
      .then((response) => {
        const userData = {
          ...response.data,
        };
        authManager.updateUser(userData);
        setAvailableDates({ ...updatedAvailableDays });
      })
      .finally(() => {
        setIsLoading(false);
        setBookFormVisible(false);
      });
  };

  const onCloseDialog = () => {
    setTimeSlotVisible(false);
    setBookFormVisible(false);
    updateUser(dispatch, authManager.retrieveCurrentUser());
    closeDialog();
  };

  const cancelDateForm = () => {
    setInitialRange((prevState) => ({ ...prevState, startDate: '' }));
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
              id={'addAvailableTime'}
              variant='contained'
              color='primary'
              onClick={handleOnBookNowClicked}
              className={classes.timeOption}
              startIcon={<AccessAlarmIcon />}>
              Add available time
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
              onClick={onCloseDialog}>
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
              updateAvailableDays={updateAvailableDays}
              containerStyle={classes.cardBorder}
              isEditable={true}
              events={currentUser?.events}
              availableDates={availableDates}
            />
            <CalendarLegend />
            <Box mt={3}>
              <SelectTimeZone
                defaultTimezoneName={defaultTimeZone}
                onChange={onChangeTimeZone}
              />
            </Box>
          </Grid>

          <Grid container direction={'column'} alignItems={'center'} sm={5} xs={12}>
            {!!isLoading && (
              <CircularProgress variant='indeterminate' size={50} />
            )}
            {bookFormVisible && !isLoading && !!initialRange.startDate && (
              <AvailableTimeRangeForm
                initialRange={initialRange}
                onAvailableRangeAdded={onAvailableRangeAdded}
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
