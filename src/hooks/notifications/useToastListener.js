import { notificationActions, useNotificationsContext } from './context';
import { useAuth } from '../../pages/auth/context/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useToastListener = () => {
  const [
    { showToast, toastToBeDisplayed },
    dispatch,
  ] = useNotificationsContext();
  const [{ currentUser }] = useAuth();

  useEffect(() => {
    if (showToast) {
      toast(toastToBeDisplayed.messageKey, {
        toastId: toastToBeDisplayed.notificationId,
        onClick: () => {
          dispatch({
            type: notificationActions.notificationVisited,
            payload: { notification: toastToBeDisplayed, currentUser },
          });
        },
      });
      dispatch({ type: notificationActions.toastCleared });
    }
  }, [showToast]);
};

export default useToastListener;
