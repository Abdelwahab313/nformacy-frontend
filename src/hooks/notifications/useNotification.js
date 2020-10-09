import { useMemo } from 'react';
import useActionCable from '../../hooks/useActionCable';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from '../../settings';
import { notificationActions, useNotificationsContext } from './context';
import { useAuth } from '../../pages/auth/context/auth';
import useToastListener from './useToastListener';

const useNotification = () => {
  const [
    { notifications, menuOpened, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();
  const [{ currentUser }] = useAuth();
  const notificationsHandler = {
    received(data) {
      dispatch({
        type: notificationActions.notificationReceived,
        payload: {
          notification: data,
          currentUser,
        },
      });
    },
  };

  const channelParams = useMemo(
    () => ({ channel: NOTIFICATION_CHANNEL_IDENTIFIER }),
    [],
  );

  useActionCable(channelParams, notificationsHandler);
  useToastListener();
  const toggleMenu = (event) => {
    dispatch({ type: notificationActions.menuToggled, payload: event });
  };

  const closeNotification = () => {
    dispatch({ type: notificationActions.menuClosed });
  };
  return {
    notifications,
    menuOpened,
    unread,
    unreadCount,
    toggleMenu,
    closeNotification,
  };
};

export default useNotification;
