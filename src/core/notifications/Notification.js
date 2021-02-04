import { history } from 'services/navigation';
import getPathForNotification from './notificationPathResolver';
import { camelizeKeys } from 'humps';

class Notification {
  static getString(t, notification) {
    const messageKey = notification.messageKey;
    return t(`notifications:${messageKey}`, {
      referenceNumber: notification.messageParameters?.referenceNumber,
    });
  }

  static format(notification) {
    return {
      notificationId: notification.notification_id,
      targetId: notification.target_id,
      messageKey: notification.message_key,
      messageParameters: camelizeKeys(notification.message_parameters),
      createdAt: notification.created_at,
      type: notification.type,
      readAt: notification.read_at || null,
    };
  }

  static handleClicked(notification) {
    const resolvedNotificationPath = getPathForNotification(notification);
    history.replace(resolvedNotificationPath);
  }
}

export default Notification;
