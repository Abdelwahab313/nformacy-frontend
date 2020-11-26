import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from '../styles/HomePageStyles';
import CalendarView from '../../../../components/calendar/CalendarView';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SubmitButton from '../../../../components/buttons/SubmitButton';
import Typography from '@material-ui/core/Typography';
import AvailableTimesCalendarDialog from '../../../../components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';
import authManager from 'services/authManager';
import CustomTypography from 'components/typography/Typography';

const CalendarCard = ({ currentUser }) => {
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);
  const classes = useStyles();
  const availableDates = !!currentUser.freeDates ? currentUser.freeDates : [];
  const openCalendarDialog = () => {
    setIsCalendarDialog(true);
  };

  return (
    <Card className={classes.card}>
      <Grid container alignItems={'center'} justify={'center'}>
        <Typography variant={'h6'} gutterBottom>
          Calender of Events
        </Typography>
        <CalendarView isMinimized availableDates={availableDates} />
        {authManager.isNormalUser() && (
          <Box m={1}>
            <SubmitButton
              variant='text'
              id={'open-update-calendar-dialog-btn'}
              className={classes.calendarCardButton}
              buttonText={
                <CustomTypography
                  align={'center'}
                  variant='body2'
                  fontWeight='bold'>
                  Update your Available Times
                </CustomTypography>
              }
              onClick={openCalendarDialog}
            />
          </Box>
        )}
      </Grid>

      <AvailableTimesCalendarDialog
        open={isCalendarDialogOpen}
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
