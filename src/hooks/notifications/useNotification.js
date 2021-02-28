import useActionCable from './useActionCable';
import { NotificationActions, useNotificationsContext } from './context';
import useToastListener from './useToastListener';
import {
  fetchRecentNotifications,
  markAllNotificationsSeen,
  markNotificationRead,
} from '../../apis/notifications';
import { useMutation, useQuery, useQueryCache } from 'react-query';

const useNotification = () => {
  const queryCache = useQueryCache();
  const [
    { notifications, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();

  useQuery('notifications', fetchRecentNotifications, {
    onSuccess: (response) => {
      dispatch({
        type: NotificationActions.NOTIFICATIONS_LOADED,
        payload: response.data,
      });
      queryCache.invalidateQueries('allNotifications');
    },
  });

  const [markRead] = useMutation(markNotificationRead, {
    onSuccess: () => queryCache.invalidateQueries('notifications'),
  });

  const [markAllSeen] = useMutation(markAllNotificationsSeen, {
    onSuccess: () => queryCache.invalidateQueries('notifications'),
  });

  const notificationsHandler = {
    received(data) {
      dispatch({
        type: NotificationActions.NOTIFICATION_RECIEVED,
        payload: {
          notification: data,
        },
      });
    },
  };

  const visitNotification = (notification) => {
    markRead(notification.notificationId).then(() => {
      dispatch({
        type: NotificationActions.NOTIFICATION_VISITED,
        payload: { notification: notification },
      });
    });
  };

  const seeRecentNotifications = () => {
    markAllSeen().then(() => {
      dispatch({
        type: NotificationActions.NOTIFICATIONS_MARKED_SEEN,
      });
    });
  };

  useActionCable(notificationsHandler);
  useToastListener(visitNotification);

  return {
    notifications,
    unread,
    unreadCount,
    visitNotification,
    seeRecentNotifications,
  };
};

export default useNotification;
