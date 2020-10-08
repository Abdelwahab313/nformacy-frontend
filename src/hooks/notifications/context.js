import React, { useContext, useReducer } from 'react';
import { ActionCableProvider } from '../useActionCable';
import { CHANNEL_URL } from '../../settings';
import { produce, current } from 'immer';
import { toast as showToast } from 'react-toastify';

const defaultStates = {
  notifications: [],
  menuOpened: null,
  unread: false,
  unreadCount: 0,
};

const NotificationsContext = React.createContext();

export const notificationActions = {
  notificationReceived: 'notificationReceived',
  menuToggled: 'menuToggled',
  menuClosed: 'menuClosed',
};

const MAX_NOTIFICATIONS = 10;
export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationsContext must be used within a NotificationsProvider',
    );
  }
  return context;
};
const initContext = (initialValue) => {
  return initialValue || defaultStates;
};

export const NotificationsProvider = ({
  children,
  initialNotifications = [],
  unreadCount = 0,
}) => {
  const { Provider } = NotificationsContext;
  const initialState = {
    ...defaultStates,
    notifications: initialNotifications,
    unread: unreadCount > 0,
    unreadCount,
  };
  return (
    <Provider
      value={useReducer(NotificationsReducer, initialState, initContext)}>
      <ActionCableProvider url={CHANNEL_URL}>{children}</ActionCableProvider>
    </Provider>
  );
};

function Notification(notification) {
  return {
    notificationId: notification.notification_id,
    targetId: notification.target_id,
    messageKey: notification.message_key,
    createdAt: notification.created_at,
    type: notification.type,
    readAt: null,
  };
}

const updateUserInLocalStorage = (currentUser, updatedFields) => {
  localStorage.setItem(
    'user',
    JSON.stringify({ ...currentUser, ...updatedFields }),
  );
};

const NotificationsReducer = (state, action) => {
  switch (action.type) {
    case notificationActions.notificationReceived:
      const currentUser = action.payload.currentUser;
      const receivedNotification = Notification(action.payload.notification);
      showToast(receivedNotification.messageKey, {
        toastId: receivedNotification.notificationId,
      });
      return produce(state, (draftState) => {
        if (draftState.notifications.length === MAX_NOTIFICATIONS) {
          draftState.notifications.pop();
        }
        draftState.notifications.unshift(receivedNotification);
        draftState.unread = true;
        draftState.unreadCount = state.unreadCount + 1;
        updateUserInLocalStorage(currentUser, {
          unreadNotifications: draftState.unreadCount,
          notifications: current(draftState.notifications),
        });
      });
    case notificationActions.menuToggled:
      return produce(state, (draftState) => {
        if (state.menuOpened?.contains(action.payload.target)) {
          draftState.menuOpened = null;
        } else {
          draftState.menuOpened = action.payload.currentTarget;
          draftState.unread = false;
        }
      });
    case notificationActions.menuClosed:
      return produce(state, (draftState) => {
        draftState.menuOpened = null;
      });
    default:
      throw Error(
        `Action: ${action.type} is not defined in notifications reducer`,
      );
  }
};
