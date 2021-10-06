import React, { useState } from 'react';
import CandidateItem from 'pages/App/ServiceRequests/details/subComponents/CandidateItem';
import { lighterPink } from 'styles/colors';
import MeetingTimeSelectorCalendarDialog from 'components/calendarDialogs/MeetingTime/MeetingTimeSelectorCalendarDialog';
import { useTranslation } from 'react-i18next';
import { useSnackBar } from 'context/SnackBarContext';
import { getUserName } from 'core/user';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import { scheduleMeetingForMentoringService } from 'apis/meetingsAPI';
import { SERVICE_STATUS } from 'constants/questionStatus';

const MenteeCard = ({ serviceDetails }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  const { showSuccessMessage } = useSnackBar();
  const history = useHistory();
  const serviceId = serviceDetails?.id;
  const consultant = serviceDetails?.mentoring?.consultant;

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const onSubmitDate = (selectedTime) => {
    scheduleMeetingForMentoringService(
      serviceId,
      selectedTime,
      consultant.id,
    ).then(() => {
      showSuccessMessage(
        `Meeting has been scheduled successfully with ${getUserName(
          consultant,
        )}`,
      );
      history.push(RoutesPaths.App.Dashboard);
    });
    closeCalendar();
  };

  return (
    <>
      <CandidateItem
        bgcolor={lighterPink}
        candidate={consultant}
        isFocused={serviceDetails.state === SERVICE_STATUS.pendingCallScheduling}
        setFocusedCandidate={() => {}}
        onCandidateClick={() => {
          setShowCalendar(true);
        }}
        buttonText={t('bookAMeeting')}
      />
      <MeetingTimeSelectorCalendarDialog
        open={showCalendar}
        onClose={closeCalendar}
        onSubmitDate={onSubmitDate}
        candidate={consultant}
      />
    </>
  );
};

export default MenteeCard;
