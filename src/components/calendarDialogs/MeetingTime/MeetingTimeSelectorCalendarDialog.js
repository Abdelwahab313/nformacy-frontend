import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Transition from 'components/animations/Transition';
import MeetingScheduler from './MeetingScheduler';

const MeetingTimeSelectorCalendarDialog = ({
  open,
  onClose,
  onSubmitDate,
  candidate,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={'lg'}
      id={'calendar-dialog'}>
      <DialogTitle id='dialog-title'>
        {'Please Pick a time to Schedule the Call'}
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
