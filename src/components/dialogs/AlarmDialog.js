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
        <Button onClick={onAccept} color='primary' id='confirmBack'>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmDialog;
