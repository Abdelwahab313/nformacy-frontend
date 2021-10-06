import React from 'react';
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
  const { t } = useTranslation();

  const onSubmitCallback = () => {
    return updateMentoringAvailability(serviceId)
      .then(() => {
        showSuccessMessage(t('successConfirmAvailability'));
      })
      .catch(() => {
        showErrorMessage(t('failedSubmitAvailability'));
      })
      .finally(() => {
        closeDialog();
        window.location.reload(true);
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
