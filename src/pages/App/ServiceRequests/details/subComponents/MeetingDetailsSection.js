import React from 'react';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lighterPink } from 'styles/colors';
import CandidateItem from './CandidateItem';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import { MEETING_STATUS, SERVICE_STATUS } from 'constants/questionStatus';
import { useLocation } from 'react-router';
import { getCallEvaluationLink, history } from 'services/navigation';
import authManager from 'services/authManager';
import { MEETING_TYPES, endCallTime } from 'core/meeting';
import JoinJitsiMeetingButton from 'components/buttons/JoinJitsiMeetingButton';

const MeetingDetailsSection = ({ meeting }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const location = useLocation();
  const serviceId = location?.state?.serviceId;
  const meetingId = meeting.id;
  const meetingState = meeting.state;
  const canJoinMeeting = meeting.state === MEETING_STATUS.callScheduled;

  const isMeetingFinished = meetingState === SERVICE_STATUS.callFinished;

  const handleClick = () => {
    if (!!isMeetingFinished) {
      return history.push(getCallEvaluationLink(meetingId, serviceId));
    }
  };

  const isConsultantScreeningCall =
    meeting?.callType === MEETING_TYPES.ConsultantScreening;
  const showFreelancerSection = !authManager.isNormalUser();
  const showClientSection =
    !authManager.isClient() && !isConsultantScreeningCall;

  const handleMeetingHeader = () => {
    if (!!isMeetingFinished) {
      return `${t('pastMeetingHeader')} ${formattedDateTimeNoSeconds(
        new Date(meeting?.callTime),
      )}`;
    } else {
      return `${t('fututreMeetingHeader')} ${formattedDateTimeNoSeconds(
        new Date(meeting?.callTime),
      )} to ${endCallTime(meeting?.callTime)}`;
    }
  };
  const handleClientMeetingBtn = () => {
    if (!!isMeetingFinished) {
      if (!!meeting.freelancerEvaluationId) {
        return t('viewEvaluations');
      } else {
        return t('rateTheCall');
      }
    }
  };
  const handleFreelancerMeetingBtn = () => {
    if (!!isMeetingFinished) {
      if (!!meeting.clientEvaluationId) {
        return t('viewEvaluations');
      } else {
        return t('rateTheCall');
      }
    }
  };
  return (
    <Card>
      <CardHeader
        className={classNames(classes.container, {
          [classes.containerAr]: isArlang,
        })}
        color='primary'>
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
                buttonText={handleFreelancerMeetingBtn()}
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
                buttonText={handleClientMeetingBtn()}
                clientType={t('client')}
              />
            </Box>
          </Grid>
        )}
      </Grid>
      {!!canJoinMeeting && (
        <Grid
          container
          justify='flex-end'
          className={classes.joinButtonContainer}>
          {/* <Grid item> */}
          <JoinJitsiMeetingButton
            buttonText={'Join call'}
            meetingRoomId={meeting.jitsiRoomName}
          />
          {/* </Grid> */}
        </Grid>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  noShadow: {
    // boxShadow: 'none',
  },
  shortlistContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
  },
  containerAr: {
    direction: 'ltr',
  },
  joinJitsiMeetingButton: {
    width: '10rem',
    height: '3rem',
    marginBottom: theme.spacing(1),
  },
  joinZoomMeetingButton: {
    width: '10rem',
    height: '3rem',
  },
  joinButtonsContainer: {
    padding: theme.spacing(3),
  },
}));

export default MeetingDetailsSection;
