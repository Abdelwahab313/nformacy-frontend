import React from 'react';
import { useSnackBar } from 'context/SnackBarContext';
import { useTranslation } from 'react-i18next';
import { deactivateUser } from 'apis/userAPI';
import ConfirmActionButton from 'components/buttons/ConfirmActionButton';
import { makeStyles } from '@material-ui/core';
import { history } from 'services/navigation';

const DeactivateAccountButton = ({ accountId }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const onConfirmAction = () => {
    return deactivateUser(accountId)
      .then(() => {
        showSuccessMessage(t('userDeactivated'));
        history.go(0);
      })
      .catch(() => {
        showErrorMessage(t('userDeativationFailed'));
      });
  };

  return (
    <ConfirmActionButton
      buttonText={t('deactivate')}
      buttonClassName={classes.buttonStyles}
      buttonId={'deactivateUser'}
      alarmTitle={t('deactivateAlarmTitle')}
      AlarmContent={t('deactivateAlarmContent')}
      onConfirmAction={onConfirmAction}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  buttonStyles: {
    fontSize: '11px',
    margin: [theme.spacing(1), theme.spacing(2)],
  },
}));

export default DeactivateAccountButton;
