import React, { Fragment, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import CandidateItem from 'pages/App/ServiceRequests/details/subComponents/CandidateItem';
import { lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { getUserName } from 'core/user';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import { scheduleMeetingWithFreelancer } from 'apis/meetingsAPI';

const AnswerOwner = ({ user }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  const { showSuccessMessage } = useSnackBar();
  const history = useHistory();

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const onSubmitDate = (selectedTime) => {
    scheduleMeetingWithFreelancer(selectedTime, user.id).then(() => {
      showSuccessMessage(
        `Meeting has been scheduled successfully with ${getUserName(user)}`,
      );
      history.push(RoutesPaths.App.Dashboard);
    });
    closeCalendar();
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
              buttonText={t('bookAMeeting')}
            />
          </Box>
        </Grid>
      </Grid>
      <MeetingTimeSelectorCalendarDialog
        open={showCalendar}
        onClose={closeCalendar}
        onSubmitDate={onSubmitDate}
        candidate={user}
      />
    </Fragment>
  );
};

export default AnswerOwner;
