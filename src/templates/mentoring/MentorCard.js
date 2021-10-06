import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CandidateItem from 'pages/App/ServiceRequests/details/subComponents/CandidateItem';
import { lighterPink } from 'styles/colors';
import SubmitCalendarAvailabilityForMeetingDialog from 'components/calendarDialogs/AvailableTimes/SubmitCalendarAvailabilityForMeetingDialog';
import { SERVICE_STATUS } from 'constants/questionStatus';

const MentorCard = ({ serviceDetails }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  const beneficiary = serviceDetails?.mentoring?.beneficiary;

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <>
      <CandidateItem
        bgcolor={lighterPink}
        candidate={beneficiary}
        isFocused={serviceDetails.state === SERVICE_STATUS.pendingMentorAvailability}
        setFocusedCandidate={() => {}}
        onCandidateClick={() => {
          setShowCalendar(true);
        }}
        buttonText={t('update availability')}
      />
      <SubmitCalendarAvailabilityForMeetingDialog
        open={showCalendar}
        closeDialog={closeCalendar}
        serviceId={serviceDetails.id}
      />
    </>
  );
};

export default MentorCard;
