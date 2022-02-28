import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
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
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const classes = useStyles();
  return (
    <Dialog
    className={classNames(classes.updateCalendarContainer, {
      [classes.updateCalendarContainerAr]: isArlang,
    })}
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
const useStyles = makeStyles(() => ({
  updateCalendarContainer: {
    display: 'flex',
  },
  updateCalendarContainerAr: {
   direction: 'ltr',
  },
}));


export default MeetingTimeSelectorCalendarDialog;
