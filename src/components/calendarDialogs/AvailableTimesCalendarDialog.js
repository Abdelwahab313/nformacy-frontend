import React, { Fragment, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarView from '../calendar/CalendarView';
import Transition from '../animations/Transition';
import SubmitButton from '../buttons/SubmitButton';
import SelectTimeZone from '../inputs/SelectTimeZone';
import Box from '@material-ui/core/Box';
import AvailableTimeRangeForm from './AvailableTimesRangeForm';
import t from '../../locales/en/freelancerProfile.json';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import {
  convertTimeToUTC,
  formatDayAsKey,
  formatTime,
  getTimeAtTimeZone,
} from '../../services/dateTimeParser';
import { updateProfile } from '../../apis/userAPI';
import { useAuth } from '../../pages/auth/context/auth';
import { updateUser } from '../../pages/auth/context/authActions';

const AvailableTimesCalendarDialog = ({ open, closeDialog, onSubmit }) => {
  const classes = useStyles();
  const [{ currentUser }, dispatch] = useAuth();
  const [availableDates, setAvailableDates] = useState(!!currentUser.freeDates ? currentUser.freeDates : {});

  const [selectedRange, setSelectedRange] = useState({
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const onChangeTimeZone = (timezone) => {
    console.log(timezone);
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
        startTime: getTimeAtTimeZone(availableDayObject.intervals.from, previousLocalState.timeZone),
        endTime: getTimeAtTimeZone(availableDayObject.intervals.to, previousLocalState.timeZone),
      }));
    } else {
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
    const selectedDays = Object.keys(enumerateAvailableDays(selectedRange));
    selectedDays.forEach(formattedDay => {
      if (formattedDay in updatedAvailableDates) {
        delete updatedAvailableDates[formattedDay];
      }
    });
    updateAvailableDays(updatedAvailableDates);
  };

  const handleAddRangeClicked = () => {
    const selectedAvailableDays = enumerateAvailableDays(selectedRange);
    const newAvailableDays = { ...availableDates, ...selectedAvailableDays };
    updateAvailableDays(newAvailableDays);
  };


  const enumerateAvailableDays = (selectedRange) => {
    const { startDate, endDate, startTime, endTime } = selectedRange;
    const enumeratedDate = moment(startDate).clone(), dates = {};
    while (enumeratedDate.isSameOrBefore(endDate)) {
      let formattedDay = formatDayAsKey(enumeratedDate);
      dates[formattedDay] = {
        intervals:
          {
            from: convertTimeToUTC(formatTime(startTime), selectedRange.timeZone),
            to: convertTimeToUTC(formatTime(endTime), selectedRange.timeZone),
          },
      };
      enumeratedDate.add(1, 'days');
    }
    console.log('-----dates', dates);
    return dates;
  };

  const updateAvailableDays = (updatedAvailableDays) => {
    updateProfile({ freeDates: updatedAvailableDays }, currentUser.id).then(response => {
      console.log('-=-=-=-=updatedDays', updatedAvailableDays);
      updateUser(dispatch, response.data);
      setAvailableDates({ ...updatedAvailableDays });
    });
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
            <Typography variant={'h6'}>
              {t['updateCalendarTitle']}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton id={'close-dialog'} aria-label='edit' onClick={closeDialog}>
              <CloseIcon color={'primary'}/>
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
                onChange={onChangeTimeZone}/>
            </Box>
          </Grid>

          <Grid container direction={'column'} alignItems={'center'} xs={5}>
            {!!selectedRange.startDate && (
              <Fragment>
                <AvailableTimeRangeForm
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                />


                <Grid className={classes.deleteAvailableDayButton}>
                  <Button
                    variant="text"
                    color="primary"
                    size="large"
                    className={classes.margin}
                    onClick={handleDeleteAvailableDay}>
                    I am Unavailable this day
                  </Button>
                </Grid>
                <Grid className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.margin}
                    onClick={() => setSelectedRange(prevState => ({ ...prevState, startDate: '' }))}>
                    Cancel
                  </Button>
                  <SubmitButton
                    id={'confirm'}
                    onClick={handleAddRangeClicked}
                    size="large"
                    className={classes.margin}
                    buttonText={t['confirm']}
                  />
                </Grid>
              </Fragment>
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
