import React from 'react';
import Card from '@material-ui/core/Card';
import useStyles from '../styles/HomePageStyles';
import Calendar from './Calendar';
import { useAuth } from 'pages/auth/context/auth';

const CalendarCard = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();

  return (
    <Card className={[classes.card, classes.calendarCard]}>
      <Calendar currentUser={currentUser} />
    </Card>
  );
};

export default CalendarCard;
