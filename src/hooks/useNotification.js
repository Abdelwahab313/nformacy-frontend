import React, { useCallback, useMemo, useRef, useState } from 'react';
import useActionCable from '../hooks/useActionCable';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from '../settings';
import { toast } from 'react-toastify';

const useNotification = () => {
  const notificationsReceived = useRef([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsUnopened, setNotificationsUnOpened] = useState(true);
  const [notificationMenuOpened, setNotificationMenuOpened] = React.useState(
    null,
  );

  const addNotification = (notification) => {
    notificationsReceived.current = [
      notification['message_key'],
      ...notificationsReceived.current,
    ];
    setNotifications(notificationsReceived.current);
    setNotificationsUnOpened(true);
  };

  const notificationsHandler = useMemo(
    () => ({
      received(data) {
        addNotification(data);
        toast(data['message_key']);
      },
    }),
    [addNotification],
  );

  const channelParams = useMemo(
    () => ({ channel: NOTIFICATION_CHANNEL_IDENTIFIER }),
    [],
  );

  useActionCable(channelParams, notificationsHandler);

  const openNotification = (event) => {
    if (
      notificationMenuOpened &&
      notificationMenuOpened.contains(event.target)
    ) {
      setNotificationMenuOpened(null);
    } else if (notifications.length > 0) {
      setNotificationMenuOpened(event.currentTarget);
    }
    setNotificationsUnOpened(false);
  };

  const closeNotification = useCallback(() => {
    setNotificationMenuOpened(null);
  }, [setNotificationMenuOpened]);

  return {
    notifications,
    notificationsUnopened,
    notificationMenuOpened,
    openNotification,
    addNotification,
    closeNotification,
  };
};

export default useNotification;
