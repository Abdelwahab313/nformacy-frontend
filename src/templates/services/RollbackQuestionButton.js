import React, { useState } from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import { useSnackBar } from 'context/SnackBarContext';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { rollbackQuestion } from 'apis/servicesAPI';

import AlarmDialog from 'components/dialogs/AlarmDialog';

const RollbackQuestionButton = ({ serviceId }) => {
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();
  const { t } = useTranslation();
  const classes = useStyles();

  const onButtonClicked = () => {
    setIsConfirmDialogOpened(true);
  };

  const closeDialog = () => {
    setIsConfirmDialogOpened(false);
  };

  const onAgree = () => {
    rollbackQuestion(serviceId)
      .then(() => {
        showSuccessMessage(t('questionDeleted'));
        closeDialog();
      })
      .catch(() => {
        showErrorMessage(t('questionDeletedFailed'));
      });
  };

  return (
    <>
      <SubmitButton
        id={'rollbackQuestion'}
        onClick={() => onButtonClicked()}
        color='secondary'
        className={classes.rollbackQuestion}
        buttonText={'Rollback Question'}
      />
      <AlarmDialog
        open={isConfirmDialogOpened}
        closeDialog={closeDialog}
        onAccept={onAgree}
        onCancel={closeDialog}
        title={t('rollbackAlarmTitle')}
        content={t('rollbackAlarmContent')}
      />
    </>
  );
};

export default RollbackQuestionButton;
