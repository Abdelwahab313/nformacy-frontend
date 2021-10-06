import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import SubmitCalendarAvailabilityForMeetingDialog from 'components/calendarDialogs/AvailableTimes/SubmitCalendarAvailabilityForMeetingDialog';

const UpdateAvailability = ({ status, actionNeeded }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();

  const serviceId = 1;

  const openCalendar = () => {
    setShowCalendar(true);
  };
  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <Fragment>
      <StyledStatusChip
        data-status={status}
        onClick={() => openCalendar()}
        className={'state'}
        data-reference={serviceId}
        label={t(`serviceStatus:${actionNeeded}`)}
      />
      <SubmitCalendarAvailabilityForMeetingDialog
        open={showCalendar}
        closeDialog={closeCalendar}
        serviceId={serviceId}
      />
    </Fragment>
  );
};

const StyledStatusChip = withStyles({
  root: {
    margin: 1,
    backgroundColor: '#cec8ef',
  },
  label: {
    fontSize: '0.8rem',
  },
})(Chip);

export default UpdateAvailability;
