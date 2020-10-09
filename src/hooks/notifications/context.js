import React, { useContext, useReducer } from 'react';
import { ActionCableProvider } from '../useActionCable';
import { CHANNEL_URL } from '../../settings';
import { produce, current } from 'immer';
import { toast as showToast } from 'react-toastify';
import authManager from '../../services/authManager';

const defaultStates = {
  notifications: [],
  menuOpened: null,
  unread: false,
  unreadCount: 0,
};

const NotificationsContext = React.createContext();

export const notificationActions = {
  notificationReceived: 'notificationReceived',
  notificationVisited: 'notificationVisited',
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

const isNullOrUndefined = (value) => value == undefined;

const NotificationsReducer = (state, action) => {
  switch (action.type) {
    case notificationActions.notificationReceived:
      const currentUser = action.payload.currentUser;
      const receivedNotification = Notification(action.payload.notification);
      showToast(receivedNotification.messageKey, {
        toastId: receivedNotification.notificationId,
      });
      return produce(state, (draftState) => {
        const alreadyReceived = state.notifications.find(
          (notify) =>
            notify.notificationId === receivedNotification.notificationId,
        );
        draftState.unread = true;
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
    case notificationActions.notificationVisited:
      return produce(state, (draftState) => {
        const toBeRead = draftState.notifications.find(
          (notification) =>
            notification.notificationId === action.payload.notificationId,
        );
        if (isNullOrUndefined(toBeRead.readAt)) {
          draftState.unreadCount = state.unreadCount - 1;
          toBeRead.readAt = Date.now();
        }
        draftState.unread = true;
      });
    default:
      throw Error(
        `Action: ${action.type} is not defined in notifications reducer`,
      );
  }
};
