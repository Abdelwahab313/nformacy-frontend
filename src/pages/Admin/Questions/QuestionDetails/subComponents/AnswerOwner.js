import React, { Fragment, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import CandidateItem from 'pages/App/ServiceRequests/details/subComponents/CandidateItem';
import { lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';

const AnswerOwner = ({ user }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const closeCalendar = () => {
    setShowCalendar(false);
  };
  if (!user) {
    return '';
  }
  return (
    <Fragment>
      <Grid container alignItems='center' justify='center'>
        <Grid item xs={12} md={3}>
          <Box className={'shortlistedConsultants'}>
            <CandidateItem
              bgcolor={lighterPink}
              candidate={user}
              isFocused={true}
              setFocusedCandidate={() => {}}
              onCandidateClick={() => {
                setShowCalendar(true);
              }}
              buttonText={'join meeting'}
            />
          </Box>
        </Grid>
      </Grid>
      <MeetingTimeSelectorCalendarDialog
        open={showCalendar}
        onClose={closeCalendar}
        serviceId={1}
        candidate={user}
      />
    </Fragment>
  );
};

export default AnswerOwner;
