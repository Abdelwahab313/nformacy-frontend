import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Transition from 'components/animations/Transition';
import MeetingScheduler from './MeetingScheduler';
import { useTranslation } from 'react-i18next';

const MeetingTimeSelectorCalendarDialog = ({
  open,
  onClose,
  onSubmitDate,
  candidate,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {t('pickYourCall')}
      </DialogTitle>
      <DialogContent>
        <MeetingScheduler
          user={candidate}
          onSubmitDate={onSubmitDate}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MeetingTimeSelectorCalendarDialog;
