import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import { lightOrange, lightTurquoise, lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CandidateItem from './CandidateItem';
import { useTranslation } from 'react-i18next';

const ShortlistCandidate = ({ candidates, serviceId }) => {
  const classes = useStyles();
  const [focusedCandidate, setFocusedCandidate] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const closeCalendar = () => {
    setSelectedCandidate('');
  };
  const { t } = useTranslation();

  const shortlistedContainerColors = [lightOrange, lightTurquoise, lighterPink];
  return (
    <Card className={classes.noShadow}>
      <CardHeader color='primary'>
        <Typography component={'h4'} id={'Shortlist'}>
          {t('shortlistCandidate')}
        </Typography>
      </CardHeader>
      <Grid
        container
        justify='space-evenly'
        className={classes.shortlistContainer}>
        {candidates.map((candidate, index) => (
          <Grid item xs={12} md={3}>
            <Box className={'shortlistedConsultants'}>
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

export default ShortlistCandidate;
