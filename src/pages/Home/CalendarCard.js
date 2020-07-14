import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './styles/HomePageStyles';
import CalendarView from '../Calendar/CalendarView';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SubmitButton from '../../components/buttons/SubmitButton';
import Typography from '@material-ui/core/Typography';

const CalendarCard = ({ user }) => {
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);
  const classes = useStyles();

  const openCalendarDialog = () => {
    console.log('clicked');
  };

  return (
    <Card className={classes.card}>
      <Grid container alignItems={'center'} justify={'center'}>
        <CalendarView
          availableDates={!!user.freeDates ? user.freeDates : []}
        />

        <Box m={1}>
          <SubmitButton
            buttonText={
              (<Typography align={'center'} variant="body2">
                Update your Available Times
              </Typography>)
            }
            onClick={openCalendarDialog}/>
        </Box>
      </Grid>
    </Card>
  );
};

export default CalendarCard;