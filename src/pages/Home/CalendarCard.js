import React from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './styles/HomePageStyles';
import CalendarView from '../Calendar/CalendarView';
import { Grid } from '@material-ui/core';

const CalendarCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid item>
        <CalendarView/>
      </Grid>
    </Card>
  );
};

export default CalendarCard;