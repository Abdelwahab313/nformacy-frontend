import React, { useState } from 'react';
import AvailableTimesCalendarDialog from './AvailableTimesCalendarDialog';
import { updateMentoringAvailability } from 'apis/servicesAPI';
import { useSnackBar } from 'context/SnackBarContext';
import { useTranslation } from 'react-i18next';

const SubmitCalendarAvailabilityForMeetingDialog = ({
  open,
  closeDialog,
  serviceId,
}) => {
  const { showSuccessMessage, showErrorMessage } = useSnackBar();
  const [, setShowCalendar] = useState(false);
  const { t } = useTranslation();

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const onSubmitCallback = () => {
    return updateMentoringAvailability(serviceId)
      .then(() => {
        showSuccessMessage(t('successConfirmAvailability'));
        closeCalendar();
      })
      .catch(() => {
        showErrorMessage(t('failedSubmitAvailability'));
      });
  };
  return (
    <AvailableTimesCalendarDialog
      open={open}
      closeDialog={closeDialog}
      onSubmitCallback={onSubmitCallback}
      showSubmitButton
    />
  );
};
export default SubmitCalendarAvailabilityForMeetingDialog;
