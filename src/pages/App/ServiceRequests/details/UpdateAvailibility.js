import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import AvailableTimesCalendarDialog from 'components/calendarDialogs/AvailableTimes/AvailableTimesCalendarDialog';

const UpdateAvailability = ({ status, serviceId, actionNeeded }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
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
      <AvailableTimesCalendarDialog
        open={showCalendar}
        closeDialog={closeCalendar}
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
