import { useMemo } from 'react';
import useActionCable from '../../hooks/useActionCable';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from '../../settings';
import {
  notificationActions,
  useNotificationsContext,
} from './context';
import { AuthActionTypes, useAuth } from '../../pages/auth/context/auth';

const useNotification = () => {
  const [
    { notifications, menuOpened, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();
  const [{ currentUser }, dispatchUser] = useAuth();

  const notificationsHandler = {
    received(data) {
      dispatch({
        type: notificationActions.notificationReceived,
        payload: {
          ...data,
          updateUserInLocalStorage: (updatedNotifications) =>
            dispatchUser({
              type: AuthActionTypes.UPDATE_CURRENT_USER,
              payload: {
                ...currentUser,
                ...updatedNotifications,
              },
            }),
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
