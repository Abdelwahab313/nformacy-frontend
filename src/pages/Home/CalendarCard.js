import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './styles/HomePageStyles';
import CalendarView from '../../components/calendar/CalendarView';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SubmitButton from '../../components/buttons/SubmitButton';
import Typography from '@material-ui/core/Typography';
import AvailableTimesCalendarDialog from '../../components/calendarDialogs/AvailableTimesCalendarDialog';

const CalendarCard = ({ user }) => {
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);
  const classes = useStyles();
  const availableDates = !!user.freeDates ? user.freeDates : [];
  const openCalendarDialog = () => {
    setIsCalendarDialog(true);
    console.log('clicked');
  };

  return (
    <Card className={classes.card}>
      <Grid container alignItems={'center'} justify={'center'}>
        <CalendarView
          availableDates={availableDates}
        />

        <Box m={1}>
          <SubmitButton
            id={"open-update-calendar-dialog-btn"}
            buttonText={
              (<Typography align={'center'} variant="body2">
                Update your Available Times
              </Typography>)
            }
            onClick={openCalendarDialog}/>
        </Box>
      </Grid>
      <AvailableTimesCalendarDialog
        open={isCalendarDialogOpen}
        userAvailableDates={availableDates}
        onSubmit={() => {
          setIsCalendarDialog(false);
        }}
        closeDialog={() => {
          setIsCalendarDialog(false);
        }}
      />
    </Card>
  );
};

export default CalendarCard;