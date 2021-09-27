import React, { Fragment, useState } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import CandidateItem from 'pages/App/ServiceRequests/details/subComponents/CandidateItem';
import { lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { getUserName } from 'core/user';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import { scheduleMeetingWithFreelancer } from 'apis/meetingsAPI';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import authManager from 'services/authManager';
import AvailableTimesCalendarDialog from 'components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';

const MentoringDetailsSection = ({ serviceDetails }) => {
  const classes = useStyles();

  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  const { showSuccessMessage } = useSnackBar();
  const history = useHistory();
  const serviceId = serviceDetails?.id;
  const consultant = serviceDetails?.mentoring?.consultant;
  const beneficiary = serviceDetails?.mentoring?.beneficiary;
  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const onSubmitDate = (selectedTime) => {
    scheduleMeetingWithFreelancer(serviceId, selectedTime, consultant.id).then(
      () => {
        showSuccessMessage(
          `Meeting has been scheduled successfully with ${getUserName(
            consultant,
          )}`,
        );
        history.push(RoutesPaths.App.Dashboard);
      },
    );
    closeCalendar();
  };

  if (!consultant || !!serviceDetails.meetings?.length) {
    return '';
  }
  return (
    <Fragment>
      <Card className={classes.noShadow}>
        <CardHeader color='primary'>
          <Typography component={'h4'} id={'Shortlist'}>
            {t('mentorDetails')}
          </Typography>
        </CardHeader>
        <Grid
          container
          justify='space-evenly'
          className={classes.shortlistContainer}>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={12} md={3}>
              <Box className={'shortlistedConsultants'}>
                {authManager.isNormalUser() ? (
                  <CandidateItem
                    bgcolor={lighterPink}
                    candidate={beneficiary}
                    isFocused={true}
                    setFocusedCandidate={() => {}}
                    onCandidateClick={() => {
                      setShowCalendar(true);
                    }}
                    buttonText={t('update availability')}
                  />
                ) : (
                  <CandidateItem
                    bgcolor={lighterPink}
                    candidate={consultant}
                    isFocused={true}
                    setFocusedCandidate={() => {}}
                    onCandidateClick={() => {
                      setShowCalendar(true);
                    }}
                    buttonText={t('bookAMeeting')}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
          {authManager.isNormalUser() ? (
            <AvailableTimesCalendarDialog
              open={showCalendar}
              closeDialog={closeCalendar}
            />
          ) : (
            <MeetingTimeSelectorCalendarDialog
              open={showCalendar}
              onClose={closeCalendar}
              onSubmitDate={onSubmitDate}
              candidate={consultant}
            />
          )}
        </Grid>
      </Card>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  noShadow: {
    boxShadow: 'none',
  },
  shortlistContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
  buttonMargin: {
    marginRight: '10px',
  },
}));

export default MentoringDetailsSection;
