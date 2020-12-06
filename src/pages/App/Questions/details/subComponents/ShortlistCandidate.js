import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { lightOrange, lightTurquoise, lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import { getUserName } from 'core/user';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';

const ShortlistCandidate = ({ candidates, serviceId }) => {
  const classes = useStyles();
  const [focusedCandidate, setFocusedCandidate] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const closeCalendar = () => {
    setSelectedCandidate('');
  };

  const shortlistedContainerColors = [lightOrange, lightTurquoise, lighterPink];
  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'Shortlist'}>
          Shortlist Candidate
        </Typography>
      </CardHeader>
      <Grid
        container
        justify='space-evenly'
        className={classes.shortlistContainer}>
        {candidates.map((candidate, index) => (
          <Grid item xs={12} md={3}>
            <Box>
              <CandidateItem
                bgcolor={shortlistedContainerColors[index]}
                candidate={candidate}
                isFocused={candidate.id === focusedCandidate}
                setFocusedCandidate={setFocusedCandidate}
                onCandidateClick={() => {
                  setSelectedCandidate(candidate);
                }}
              />
            </Box>
          </Grid>
        ))}

        {!!selectedCandidate && (
          <MeetingTimeSelectorCalendarDialog
            open={!!selectedCandidate}
            onClose={closeCalendar}
            serviceId={serviceId}
            candidate={selectedCandidate}
          />
        )}
      </Grid>
    </Card>
  );
};

const CandidateItem = ({
  candidate,
  isFocused,
  setFocusedCandidate,
  onCandidateClick,
  bgcolor,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const defaultImage = require('../../../../../assets/emptyavatar.jpg');

  return (
    <div className={classes.candidateContainerBorder}>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          justify='center'
          onMouseEnter={() => setFocusedCandidate(candidate.id)}
          onMouseLeave={() => setFocusedCandidate('')}>
          <Box
            style={{ backgroundColor: bgcolor }}
            textAlign='center'
            width={1}>
            <Grid item xs={12} md={12}>
              <img
                src={!!candidate.avatar ? candidate.avatar : defaultImage}
                className={classes.candidateImg}
              />
            </Grid>
          </Box>
          <Box p={2} textAlign='center'>
            <Grid item xs={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {getUserName(candidate)}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}>
                {candidate.summary}
              </CustomTypography>
            </Grid>
            <Grid container justify='center' xs={12}>
              {isFocused && (
                <SubmitButton
                  id={'proceedBtn'}
                  className={classes.desktopVisible}
                  onClick={() => onCandidateClick()}
                  buttonText={
                    <CustomTypography variant='body1'>
                      {t('bookCandidate')}
                    </CustomTypography>
                  }
                />
              )}
              <SubmitButton
                id={'proceedBtn'}
                className={classes.mobileVisible}
                onClick={() => onCandidateClick()}
                buttonText={
                  <CustomTypography variant='body1'>
                    Book Candidate
                  </CustomTypography>
                }
              />
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
};

export default ShortlistCandidate;
