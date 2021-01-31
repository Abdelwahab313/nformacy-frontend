import React, { useState } from 'react';
import GridContainer from 'components/grid/GridContainer.js';
import GridItem from 'components/grid/GridItem.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import authManager from 'services/authManager';
import CardBody from 'components/card/CardBody';
import CalendarView from 'components/calendar/CalendarView';
import AvailableTimesCalendarDialog from 'components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';

const AdminCalendarDetails = () => {
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const [isCalendarDialogOpen, setIsCalendarDialog] = useState(false);

  const availableDates = !!currentUser.freeDates ? currentUser.freeDates : [];
  const events = !!currentUser.events ? currentUser.events : [];

  const openCalendarDialog = () => {
    setIsCalendarDialog(true);
  };
  return (
    <GridContainer justifyContent={'center'}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography component={'h4'} id={'post-service-page-header'}>
                  {t('calendar')}
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody>
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
            <CalendarView
              isMinimized
              availableDates={availableDates}
              events={events}
            />
          </CardBody>
        </Card>
      </GridItem>
      <AvailableTimesCalendarDialog
        open={isCalendarDialogOpen}
        onSubmit={() => {
          setIsCalendarDialog(false);
        }}
        closeDialog={() => {
          setIsCalendarDialog(false);
        }}
      />
    </GridContainer>
  );
};

export default AdminCalendarDetails;
