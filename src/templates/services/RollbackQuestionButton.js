import React from 'react';
import { useSnackBar } from 'context/SnackBarContext';
import { useTranslation } from 'react-i18next';
import { rollbackQuestion } from 'apis/servicesAPI';
import ConfirmActionButton from 'components/buttons/ConfirmActionButton';
import { makeStyles } from '@material-ui/core';
import { history } from 'services/navigation';

const RollbackQuestionButton = ({ serviceId }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const onConfirmAction = async () => {
    return rollbackQuestion(serviceId)
      .then(() => {
        showSuccessMessage(t('questionDeleted'));
        history.go(0);
      })
      .catch(() => {
        showErrorMessage(t('questionDeletedFailed'));
      });
  };

  return (
    <ConfirmActionButton
      buttonText={'Rollback Question'}
      buttonClassName={classes.rollbackQuestion}
      buttonId={'rollbackQuestion'}
      alarmTitle={t('rollbackAlarmTitle')}
      AlarmContent={t('rollbackAlarmContent')}
      onConfirmAction={onConfirmAction}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  rollbackQuestion: {
    fontSize: '11px',
    margin: [theme.spacing(1), theme.spacing(2)],
  },
}));

export default RollbackQuestionButton;
