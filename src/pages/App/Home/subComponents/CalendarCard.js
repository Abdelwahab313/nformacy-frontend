import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from '../styles/HomePageStyles';
import CalendarView from 'components/calendar/CalendarView';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SubmitButton from 'components/buttons/SubmitButton';
import Typography from '@material-ui/core/Typography';
import AvailableTimesCalendarDialog from 'components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';
import authManager from 'services/authManager';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';

const CalendarCard = ({ currentUser }) => {
  const classes = useStyles();
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);
  const { t } = useTranslation();

  const availableDates = !!currentUser.freeDates ? currentUser.freeDates : [];
  const events = !!currentUser.events ? currentUser.events : [];
  const openCalendarDialog = () => {
    setIsCalendarDialog(true);
  };

  return (
    <Card className={classes.card}>
      <Grid container alignItems={'center'} justify={'center'}>
        <Typography variant={'h6'} gutterBottom>
          {t('calendarOfEvents')}
        </Typography>
        <CalendarView
          isMinimized
          availableDates={availableDates}
          events={events}
        />
        {authManager.isNormalUser() && (
          <Box m={1}>
            <SubmitButton
              id={'open-update-calendar-dialog-btn'}
              buttonText={
                <CustomTypography
                  align={'center'}
                  variant='body2'
                  fontWeight='bold'>
                  {t('updateAvailableTimesBtn')}
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
