import React, { useState } from 'react';
import { useActionCable } from 'use-action-cable';

const notificationsDummy = [
  'Mike John responded to your email',
  'You have 5 new tasks',
  'You"re now friend with Andrew',
  'Another Notification',
  'Another One',
];

const useNotification = () => {
  const [notifications, setNotifications] = useState(notificationsDummy);
  const [notificationsUnopened, setNotificationsUnOpened] = useState(true);
  const [notificationMenuOpened, setNotificationMenuOpened] = React.useState(
    null,
  );
  const addNotification = notification => {
    setNotifications([notification, ...notifications])
  }
  const notificationsHandler = {
    received(data){
      addNotification(data);
    }
  }
  const channelParams = {channel: "notification"};

  useActionCable(channelParams, notificationsHandler)
  const openNotification = (event) => {
    if (
      notificationMenuOpened &&
      notificationMenuOpened.contains(event.target)
    ) {
      setNotificationMenuOpened(null);
    } else {
      setNotificationMenuOpened(event.currentTarget);
    }
  };
  const closeNotification = () => {
    setNotificationMenuOpened(null);
    setNotificationsUnOpened(false);
  };

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
