import { notificationActions, useNotificationsContext } from './context';
import { useEffect } from 'react';
import { t } from '../../locales/en/notifications.js';
import { toast } from 'react-toastify';

const useToastListener = (onToastClick) => {
  const [
    { showToast, toastToBeDisplayed },
    dispatch,
  ] = useNotificationsContext();

  const visitNotification = () => {
    onToastClick(toastToBeDisplayed);
  };
  useEffect(() => {
    if (showToast) {
      toast(
        t([toastToBeDisplayed.messageKey], toastToBeDisplayed.messageParameters),
        {
          toastId: toastToBeDisplayed.notificationId,
          onClick: visitNotification,
        },
      );
      dispatch({ type: notificationActions.toastCleared });
    }
    return () => dispatch({ type: notificationActions.toastCleared });
  }, [showToast]);
};

export default useToastListener;
