import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';

const AlarmDialog = ({
  open,
  closeDialog,
  title,
  content,
  onAccept,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} id='cancelBack' color='primary'>
          {t('cancel')}
        </Button>
        <SubmitButton
          onClick={onAccept}
          color='primary'
          id='confirmBack'
          buttonText={t('confirm')}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AlarmDialog;
