import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lighterPink } from 'styles/colors';
import CandidateItem from './CandidateItem';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import useStyles from '../styles/ShortlistCandidate';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { fetchServiceDetails } from 'apis/servicesAPI';
import useFetchData from 'hooks/useFetchData';
import { SERVICE_STATUS } from 'constants/questionStatus';
import LoadingCircle from 'components/progress/LoadingCircle';
import { useLocation } from 'react-router';
import { getCallEvaluationLink, history } from 'services/navigation';

const MeetingDetailsSection = ({ meeting }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const { fetchedData: serviceDetails, isLoading } = useFetchData(() =>
    fetchServiceDetails(serviceId),
  );
  if (isLoading) {
    return <LoadingCircle />;
  }
  const meetingId = serviceDetails.meeting.id;

  const handleClick = () => {
    if (serviceDetails.state === SERVICE_STATUS.callFinished) {
      return history.push(getCallEvaluationLink(meetingId, serviceId));
    }
    else {
      return window.location.href = meeting.link;
    }
  };

  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'confirmedCandidate'}>
          {serviceDetails.state === SERVICE_STATUS.callFinished ? `${t('meetingDetails')} ${formattedDateTimeNoSeconds(
            new Date(meeting?.callTime),
          )}` : `${t('joinMeeting')} ${formattedDateTimeNoSeconds(
            new Date(meeting?.callTime),
          )}`}
        </Typography>
      </CardHeader>
      <Grid
        container
        justify='space-evenly'
        className={classes.shortlistContainer}>
        <Grid item xs={12} md={3}>
          <Box className={'shortlistedConsultants'}>
            <CandidateItem
              bgcolor={lighterPink}
              candidate={meeting.freelancer}
              isFocused={true}
              setFocusedCandidate={() => { }}
              onCandidateClick={() => handleClick()}
              buttonText={serviceDetails.state === SERVICE_STATUS.callFinished ? 'Rate the Call' : 'join meeting'}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MeetingDetailsSection;
