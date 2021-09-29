import React, { useState } from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import AlarmDialog from 'components/dialogs/AlarmDialog';

const ConfirmActionButton = ({
  buttonText,
  buttonClassName,
  buttonId,
  alarmTitle,
  AlarmContent,
  onConfirmAction,
}) => {
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState();

  const onButtonClicked = () => {
    setIsConfirmDialogOpened(true);
  };

  const closeDialog = () => {
    setIsConfirmDialogOpened(false);
  };

  const onAgree = async () => {
    return onConfirmAction().then(() => {
      closeDialog();
    });
  };

  return (
    <>
      <SubmitButton
        id={buttonId}
        onClick={onButtonClicked}
        color='secondary'
        className={buttonClassName}
        buttonText={buttonText}
      />
      <AlarmDialog
        open={isConfirmDialogOpened}
        closeDialog={closeDialog}
        onAccept={onAgree}
        onCancel={closeDialog}
        title={alarmTitle}
        content={AlarmContent}
      />
    </>
  );
};

export default ConfirmActionButton;
