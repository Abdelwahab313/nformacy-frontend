import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lighterPink } from 'styles/colors';
import CandidateItem from './CandidateItem';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import useStyles from '../styles/ShortlistCandidate';
import {
  formattedDateTimeNoSeconds,
} from 'services/dateTimeParser';
import { SERVICE_STATUS } from 'constants/questionStatus';
import { useLocation } from 'react-router';
import { getCallEvaluationLink, history } from 'services/navigation';
import authManager from 'services/authManager';
import { MEETING_TYPES } from 'core/meeting';

const MeetingDetailsSection = ({ meeting }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const meetingId = meeting.id;
  const meetingState = meeting.state;

  const isMeetingFinished = meetingState === SERVICE_STATUS.callFinished;
  // const remainingMinitues = getTimeDiffInMinutesFromNow(meeting.callTime);
  // const isGreaterThanFifteenMinutes =
  //   !isMeetingFinished && remainingMinitues >= 15;

  const handleClick = () => {
    if (!!isMeetingFinished) {
      return history.push(getCallEvaluationLink(meetingId, serviceId));
    } else {
      return (window.location.href = meeting.link);
    }
  };

  const isConsultantScreeningCall = meeting?.callType === MEETING_TYPES.ConsultantScreening
  const showFreelancerSection = !authManager.isNormalUser();
  const showClientSection = !authManager.isClient() && !isConsultantScreeningCall;

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
  const handleClientMeetingBtn = () => {
    if (!!isMeetingFinished) {
      if (!!meeting.freelancerEvaluationId) {
        return 'View Evaluation';
      } else {
        return 'Rate the Call';
      }
    } else {
      return 'join meeting';
    }
  };
  const handleFreelancerMeetingBtn = () => {
    if (!!isMeetingFinished) {
      if (!!meeting.clientEvaluationId) {
        return 'View Evaluation';
      } else {
        return 'Rate the Call';
      }
    } else {
      return 'join meeting';
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
                setFocusedCandidate={() => { }}
                onCandidateClick={() => handleClick()}
                buttonText={handleFreelancerMeetingBtn()}
                clientType={t('freelancer')}
                // isDisabled={!!isGreaterThanFifteenMinutes}
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
                setFocusedCandidate={() => { }}
                onCandidateClick={() => handleClick()}
                buttonText={handleClientMeetingBtn()}
                clientType={t('client')}
                // isDisabled={!!isGreaterThanFifteenMinutes}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default MeetingDetailsSection;
