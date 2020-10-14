import produce from 'immer';
import getPathForNotification from '../../../services/notificationPathResolver';
import history from '../../../services/navigation';

const MAX_NOTIFICATIONS = 10;
export const Notification = (notification) => {
  return {
    notificationId: notification.notification_id,
    targetId: notification.target_id,
    messageKey: notification.message_key,
    createdAt: notification.created_at,
    type: notification.type,
    readAt: notification.read_at || null,
  };
};
export const isNullOrUndefined = (value) => value == undefined;
export const receiveNotification = (action, state) => {
  const receivedNotification = Notification(action.payload.notification);

  return produce(state, (draftState) => {
    const alreadyReceived = state.notifications.find(
      (notify) => notify.notificationId === receivedNotification.notificationId,
    );
    draftState.unread = true;
    draftState.showToast = true;
    draftState.toastToBeDisplayed = receivedNotification;
    if (alreadyReceived) return draftState;
    if (draftState.notifications.length === MAX_NOTIFICATIONS) {
      draftState.notifications.pop();
    }
    draftState.notifications.unshift(receivedNotification);
    draftState.unreadCount = state.unreadCount + 1;
  });
};
export const toggleMenu = (state, action) => {
  return produce(state, (draftState) => {
    if (state.menuOpened?.contains(action.payload.target)) {
      draftState.menuOpened = null;
    } else {
      draftState.menuOpened = action.payload.currentTarget;
    }
  });
};
export const closeMenu = (state) => {
  return produce(state, (draftState) => {
    draftState.menuOpened = null;
  });
};
export const visitNotification = (state, action) => {
  return produce(state, (draftState) => {
    draftState.menuOpened = null;
    draftState.unread = draftState.unreadCount > 0;
    const resolvedNotification = getPathForNotification(
      action.payload.notification,
    );
    history.push(resolvedNotification.path, resolvedNotification.params);
  });
};
export const clearToast = (state) => {
  return produce(state, (draftState) => {
    draftState.showToast = false;
    draftState.toastToBeDisplayed = undefined;
  });
};
export const loadNotifications = (state, action) => {
  return produce(state, (draftState) => {
    draftState.unreadCount = action.payload.unreadNotifications;
    draftState.notifications = action.payload.notifications;
    draftState.unread = draftState.unreadCount > 0;
  });
};
