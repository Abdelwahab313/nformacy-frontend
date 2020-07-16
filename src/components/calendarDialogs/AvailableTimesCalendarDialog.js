import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarView from '../calendar/CalendarView';
import Transition from '../animations/Transition';
import SubmitButton from '../buttons/SubmitButton';
import SelectTimeZone from '../inputs/SelectTimeZone';
import Box from '@material-ui/core/Box';
import AvailableTimeRangeForm from './AvailableTimesRangeForm';


const AvailableTimesCalendarDialog = ({ open, onClose, onSubmit, availableDates }) => {
  const classes = useStyles();
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const onChangeTimeZone = (timezone) => {
    console.log(timezone);
    setTimeZone(timezone.value);
  };
  const [localState, setLocalState] = useState({
    selectedStartDate: '',
    selectedEndDate: '',
    selectedStartTime: '',
    selectedEndTime: '',
  });

  const handleDayClicked = ({ selectedDay, isAvailableDay }) => {
    setLocalState((previousLocalState) => ({
      ...previousLocalState,
      selectedStartDate: selectedDay,
      selectedEndDate: selectedDay,
    }));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'update-calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please Update your Calendar with your Available Times'}
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
          <Grid container direction={'column'} justify={'space-between'} alignItems={'center'} xs={5}>
            <Grid item>
              {!!localState.selectedStartDate && (
                <AvailableTimeRangeForm
                  dateRange={{from: localState.selectedStartDate, to: localState.selectedEndDate}}
                  timeRange={{from: localState.selectedStartTime, to: localState.selectedEndTime}}
                  onSubmitRange={(handleDateChange) => console.log(handleDateChange)}
                />
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
                onClick={() => onSubmit}
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
  cardBorder: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  dialogMargin: {
    marginBottom: theme.spacing(2),
  },
}));

export default AvailableTimesCalendarDialog;
