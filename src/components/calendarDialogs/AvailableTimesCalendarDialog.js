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
import { formatDayAsKey } from '../../services/dateTimeParser';


const AvailableTimesCalendarDialog = ({ open, closeDialog, onSubmit, userAvailableDates }) => {
  const classes = useStyles();
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const onChangeTimeZone = (timezone) => {
    console.log(timezone);
    setTimeZone(timezone.value);
  };

  const [availableDates, setAvailableDates] = useState(userAvailableDates);

  const [selectedRange, setSelectedRange] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  const handleDayClicked = ({ selectedDay }) => {
    setSelectedRange((previousLocalState) => ({
      ...previousLocalState,
      startDate: selectedDay,
      endDate: selectedDay,
      startTime: moment(selectedDay).set('hour', 8),
      endTime: moment(selectedDay).set('hour', 17),
    }));
  };


  const handleDayDeleteAvailableDay = () => {
    const formattedSelectedDay = formatDayAsKey(selectedRange.startDate);
    if (formattedSelectedDay in userAvailableDates) {
      const updatedAvailableDates = { ...availableDates };
      delete updatedAvailableDates[formattedSelectedDay];
      setAvailableDates(updatedAvailableDates);
    }
  };

  const enumerateAvailableDays = (selectedRange) => {
    const { startDate, endDate, startTime, endTime } = selectedRange;
    const enumeratedDate = moment(startDate).clone(), dates = {};
    while (enumeratedDate.isSameOrBefore(endDate)) {
      let formattedDay = formatDayAsKey(enumeratedDate);
      dates[formattedDay] = {
        intervals:
          {
            from: moment(startTime).format('X'),
            to: moment(endTime).format('X'),
          },
      };
      enumeratedDate.add(1, 'days');
    }
    console.log('-----dates', dates);
    return dates;
  };

  const handleUpdateRangeClicked = () => {
    const selectedAvailableDays = enumerateAvailableDays(selectedRange);
    setAvailableDates(prevState => ({ ...prevState, ...selectedAvailableDays }));
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
                timezoneName={timeZone}
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
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.margin}
                    onClick={handleDayDeleteAvailableDay}>
                    I am not available
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
                    onClick={handleUpdateRangeClicked}
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
