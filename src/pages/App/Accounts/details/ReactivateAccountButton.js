import React from 'react';
// import { useSnackBar } from 'context/SnackBarContext';
import { useTranslation } from 'react-i18next';
// import { deactivateUser } from 'apis/userAPI';
import ConfirmActionButton from 'components/buttons/ConfirmActionButton';
import { makeStyles } from '@material-ui/core';
// import { history } from 'services/navigation';

const ReactivateAccountButton = ({}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const onConfirmAction = () => {
    return new Promise();
  };

  return (
    <ConfirmActionButton
      buttonText={t('reactivate')}
      buttonClassName={classes.buttonStyles}
      buttonId={'deactivateUser'}
      alarmTitle={t('reactivateAlarmTitle')}
      AlarmContent={t('reactivateAlarmContent')}
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

export default ReactivateAccountButton;
