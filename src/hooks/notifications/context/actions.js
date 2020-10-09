import { current, produce } from 'immer';
import getPathForNotification from '../../../services/notificationPathResolver';
import history from '../../../services/navigation';
import { markNotificationRead } from '../../../apis/notifications';
import { cloneDeep } from 'lodash';
import authManager from '../../../services/authManager';

const MAX_NOTIFICATIONS = 10;
const Notification = (notification) => {
  return {
    notificationId: notification.notification_id,
    targetId: notification.target_id,
    messageKey: notification.message_key,
    createdAt: notification.created_at,
    type: notification.type,
    readAt: null,
  };
};
const isNullOrUndefined = (value) => value == undefined;
export const receiveNotification = (action, state) => {
  const currentUser = action.payload.currentUser;
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
    authManager.updateUserInLocalStorage(currentUser, {
      unreadNotifications: draftState.unreadCount,
      notifications: current(draftState.notifications),
    });
  });
};
export const toggleMenu = (state, action) => {
  return produce(state, (draftState) => {
    if (state.menuOpened?.contains(action.payload.target)) {
      draftState.menuOpened = null;
    } else {
      draftState.menuOpened = action.payload.currentTarget;
      draftState.unread = false;
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
    const notificationToBeVisited = state.notifications.find(
      (notify) =>
        notify.notificationId === action.payload.notification.notificationId,
    );
    const currentUser = action.payload.currentUser;
    const toBeRead = draftState.notifications.find(
      (notification) =>
        notification.notificationId ===
        action.payload.notification.notificationId,
    );
    if (isNullOrUndefined(toBeRead.readAt)) {
      draftState.unreadCount -= 1;
      toBeRead.readAt = Date.now();
    }
    draftState.unread = true;
    const resolvedNotification = getPathForNotification(
      action.payload.notification,
    );
    draftState.menuOpened = null;
    history.push(resolvedNotification.path, resolvedNotification.params);
    markNotificationRead(action.payload.notification.notificationId).then(
      ({ data }) => {
        let toBeRead = cloneDeep(
          state.notifications.find(
            (notify) =>
              notify.notificationId ===
              action.payload.notification.notificationId,
          ),
        );
        toBeRead.readAt = data.readAt;
        authManager.updateUserInLocalStorage(currentUser, {
          unreadNotifications:
            notificationToBeVisited.readAt != null
              ? state.unreadCount
              : state.unreadCount - 1,
          notifications: state.notifications.map((notify) =>
            notify.notificationId === data.notificationId ? toBeRead : notify,
          ),
        });
      },
    );
  });
};
export const clearToast = (state) => {
  return produce(state, (draftState) => {
    draftState.showToast = false;
    draftState.toastToBeDisplayed = undefined;
  });
};
