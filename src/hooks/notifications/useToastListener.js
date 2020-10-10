import { notificationActions, useNotificationsContext } from './context';
import { useEffect } from 'react';
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
      toast(toastToBeDisplayed.messageKey, {
        toastId: toastToBeDisplayed.notificationId,
        onClick: visitNotification,
      });
      dispatch({ type: notificationActions.toastCleared });
    }
    return () => dispatch({ type: notificationActions.toastCleared });
  }, [showToast]);
};

export default useToastListener;
