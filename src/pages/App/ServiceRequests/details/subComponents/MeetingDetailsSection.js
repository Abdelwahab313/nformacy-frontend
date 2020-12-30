import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lighterPink } from 'styles/colors';
import CandidateItem from './CandidateItem';
import CardHeader from 'components/card/CardHeader';
import Card from 'components/card/Card';
import useStyles from '../styles/ShortlistCandidate';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';

const MeetingDetailsSection = ({ meeting }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'confirmedCandidate'}>
          {`${t('joinMeeting')} ${formattedDateTimeNoSeconds(
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
              setFocusedCandidate={() => {}}
              onCandidateClick={() => {
                window.location.href = meeting.link;
              }}
              buttonText={'join meeting'}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MeetingDetailsSection;
