import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarView from '../calendar/CalendarView';
import Transition from '../animations/Transition';
import SubmitButton from '../buttons/SubmitButton';

const AvailableTimesCalendarDialog = ({ open, onClose, onSubmit, availableDates }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please Update your Calendar with your Available Times'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className={classes.dialogMargin}>
          <Grid item xs={1}/>
          <Grid item xs>
            <CalendarView
              availableDates={availableDates}
            />
          </Grid>
          <Grid container direction={'column'} justify={'space-between'} alignItems={'center'} xs={4}>
            <Grid item>
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
  dialogMargin: {
    marginBottom: theme.spacing(2),
  },
}));

export default AvailableTimesCalendarDialog;
