import { useMemo } from 'react';
import useActionCable from '../../hooks/useActionCable';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from '../../settings';
import { notificationActions, useNotificationsContext } from './context';
import { useAuth } from '../../pages/auth/context/auth';
import { useHistory } from 'react-router';
import getPathForNotification from '../../services/notificationPathResolver';

const useNotification = () => {
  const [
    { notifications, menuOpened, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();
  const history = useHistory();
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

  const toggleMenu = (event) => {
    dispatch({ type: notificationActions.menuToggled, payload: event });
  };

  const closeNotification = () => {
    dispatch({ type: notificationActions.menuClosed });
  };

  const navigateToNotification = (notification) => {
    const resolvedNotification = getPathForNotification(notification);
    history.push(resolvedNotification.path, resolvedNotification.params);
  };
  return {
    notifications,
    menuOpened,
    unread,
    unreadCount,
    navigateToNotification,
    toggleMenu,
    closeNotification,
  };
};

export default useNotification;
