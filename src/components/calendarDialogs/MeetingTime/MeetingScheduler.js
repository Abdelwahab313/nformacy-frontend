import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import CalendarView from '../../calendar/CalendarView';
import MeetingTimePicker from './MeetingTimePicker';
import { formatDayAsKey } from 'services/dateTimeParser';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from '../../buttons/SubmitButton';
import { darkBlue } from 'styles/colors';
import { useTranslation } from 'react-i18next';

const MeetingScheduler = ({ user, onSubmitDate, onCancel }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [localState, setLocalState] = useState({
    selectedDay: '',
    selectedTime: '',
    isUpdatedTime: false,
  });

  const selectedDayTimeSlots =
    !!localState.selectedDay &&
    !!user.freeDates &&
    user.freeDates[localState.selectedDay];

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
    <Grid container spacing={2} className={classes.dialogMargin}>
      <Grid item xs>
        <CalendarView
          availableDates={!!user.freeDates ? user.freeDates : []}
          canBookDate
          selectedDay={localState.selectedDay}
          onDayClick={handleSelectDay}
        />
        <div className={classes.calendarLegend}>
          <Grid container>
            <Grid item xs={2} align="center">
              <Box className={classes.calendarLegandColorBox}></Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant={'body2'}>{t('availableTime')}</Typography>
            </Grid>
          </Grid>
        </div>

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
        <Grid item justify={'space-evenly'} className={classes.buttonContainer}>
          <Button
            variant='contained'
            size='large'
            className={classes.margin}
            onClick={() => onCancel()}>
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
  calendarLegend: {
    width: 300,
    padding: 10,
    border: '1px solid #e0e0e0',
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  calendarLegandColorBox: {
    width: 10,
    height: 10,
    backgroundColor: darkBlue,
    display: 'inline-block',
    verticalAlign: 'middle',
  }
}));

export default MeetingScheduler;
