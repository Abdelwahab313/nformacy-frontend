import { NotificationActions, useNotificationsContext } from './context';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Notification from 'core/notifications/Notification';

const useToastListener = (visitNotification) => {
  const [
    { showToast, toastToBeDisplayed },
    dispatch,
  ] = useNotificationsContext();
  const { t } = useTranslation();

  const onToastClick = () => {
    visitNotification(toastToBeDisplayed);
  };
  useEffect(() => {
    if (showToast) {
      toast(Notification.getString(t, toastToBeDisplayed), {
        toastId: toastToBeDisplayed.notificationId,
        onClick: onToastClick,
      });
      dispatch({ type: NotificationActions.TOAST_CLEARED });
    }
    return () => dispatch({ type: NotificationActions.TOAST_CLEARED });
  }, [showToast]);
};

export default useToastListener;
