import produce from 'immer';
import Notification from 'core/notifications/Notification';

const MAX_NOTIFICATIONS = 10;

export const receiveNotification = (action, state) => {
  const receivedNotification = Notification.format(action.payload.notification);

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

export const visitNotification = (state, action) => {
  return produce(state, (draftState) => {
    draftState.unread = draftState.unreadCount > 0;
    Notification.handleClicked(action.payload.notification);
  });
};

export const recentNotificationsAreSeen = (state) => {
  return produce(state, (draftState) => {
    draftState.unread = false;
    draftState.unreadCount = 0;
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
    draftState.unreadCount = action.payload.unseenNotificationsCount;
    draftState.notifications = action.payload.notifications;
    draftState.unread = draftState.unreadCount > 0;
  });
};
