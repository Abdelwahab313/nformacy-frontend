import React, { useState } from 'react';
import SubmitButton from 'components/buttons/SubmitButton';
import { getJitsiCall, history } from 'services/navigation';
import { useSnackBar } from 'context/SnackBarContext';
import { requestMeetingJWT } from 'apis/jitsiAPI';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';

const JoinJitsiMeetingButton = ({
  buttonText,
  buttonClassName,
  meetingRoomId,
  buttonId = 'jitsi-meeting-btn',
}) => {
  const [isLoading, setIsLoading] = useState();
  const { showErrorMessage } = useSnackBar();
  const { t } = useTranslation();

  const onButtonClicked = () => {
    setIsLoading(true);
    requestMeetingJWT()
      .then((response) => {
        const jaasJWT = response?.data?.jwt;
        setIsLoading(false);
        history.push(getJitsiCall(jaasJWT, meetingRoomId));
      })
      .catch(() => {
        showErrorMessage(t('somethingWrong'));
      });
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <SubmitButton
      id={buttonId}
      onClick={() => onButtonClicked()}
      color='secondary'
      className={buttonClassName}
      buttonText={buttonText}
    />
  );
};

export default JoinJitsiMeetingButton;
