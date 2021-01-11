import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lighterPink } from 'styles/colors';
import CandidateItem from './CandidateItem';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import useStyles from '../styles/ShortlistCandidate';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { useLocation } from 'react-router';
import { getCallEvaluationLink, history } from 'services/navigation';
import authManager from 'services/authManager';

const MeetingDetailsSection = ({ meeting }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const meetingId = meeting.id;
  const meetingState = meeting.state;

  const isMeetingFinished = meetingState === SERVICE_STATUS.callFinished;

  const handleClick = () => {
    if (!!isMeetingFinished) {
      return history.push(getCallEvaluationLink(meetingId, serviceId));
    } else {
      return (window.location.href = meeting.link);
    }
  };

  const showFreelancerSection = !authManager.isNormalUser();
  const showClientSection = !authManager.isClient();

  const handleMeetingHeader = () => {
    if (!!isMeetingFinished) {
      return `${t('pastMeetingHeader')} ${formattedDateTimeNoSeconds(
        new Date(meeting?.callTime),
      )}`;
    } else {
      return `${t('fututreMeetingHeader')} ${formattedDateTimeNoSeconds(
        new Date(meeting?.callTime),
      )}`;
    }
  };
  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'confirmedCandidate'}>
          {handleMeetingHeader()}
        </Typography>
      </CardHeader>
      <Grid
        container
        justify='space-evenly'
        className={classes.shortlistContainer}>
        {!!showFreelancerSection && (
          <Grid item xs={12} md={3}>
            <Box className={'shortlistedConsultants'}>
              <CandidateItem
                bgcolor={lighterPink}
                candidate={meeting.freelancer}
                isFocused={true}
                setFocusedCandidate={() => {}}
                onCandidateClick={() => handleClick()}
                buttonText={
                  !!isMeetingFinished ? 'Rate the Call' : 'join meeting'
                }
                clientType={t('freelancer')}
              />
            </Box>
          </Grid>
        )}
        {!!showClientSection && (
          <Grid item xs={12} md={3}>
            <Box className={'shortlistedConsultants'}>
              <CandidateItem
                bgcolor={lighterPink}
                candidate={meeting.client}
                isFocused={true}
                setFocusedCandidate={() => {}}
                onCandidateClick={() => handleClick()}
                buttonText={
                  !!isMeetingFinished ? 'Rate the Call' : 'join meeting'
                }
                clientType={t('client')}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default MeetingDetailsSection;
