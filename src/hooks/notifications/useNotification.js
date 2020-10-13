import { useMemo } from 'react';
import useActionCable from './useActionCable';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from '../../settings';
import { notificationActions, useNotificationsContext } from './context';
import useToastListener from './useToastListener';
import {
  fetchRecentNotifications,
  markNotificationRead,
} from '../../apis/notifications';
import { useMutation, useQuery, useQueryCache } from 'react-query';

const useNotification = () => {
  const queryCache = useQueryCache();
  const [
    { menuOpened, notifications, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();
  useQuery('notifications', fetchRecentNotifications, {
    onSuccess: (response) => {
      dispatch({
        type: notificationActions.notificationsLoaded,
        payload: response.data,
      });
      queryCache.invalidateQueries('allNotifications');
    },
  });
  const [markRead] = useMutation(markNotificationRead, {
    onSuccess: () => queryCache.invalidateQueries('notifications'),
  });

  const notificationsHandler = {
    received(data) {
      dispatch({
        type: notificationActions.notificationReceived,
        payload: {
          notification: data,
        },
      });
    },
  };

  const channelParams = useMemo(
    () => ({ channel: NOTIFICATION_CHANNEL_IDENTIFIER }),
    [],
  );
  const visitNotification = (notification) => {
    markRead(notification.notificationId).then(() => {
      dispatch({
        type: notificationActions.notificationVisited,
        payload: { notification: notification },
      });
    });
  };

  useActionCable(channelParams, notificationsHandler);
  useToastListener(visitNotification);

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
    visitNotification,
  };
};

export default useNotification;
