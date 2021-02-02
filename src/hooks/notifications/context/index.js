import React, { useContext, useReducer } from 'react';
import { ActionCableProvider } from '../useActionCable';
import { CHANNEL_URL } from '../../../settings';
import {
  clearToast,
  loadNotifications,
  receiveNotification,
  visitNotification,
} from './actions';

const defaultStates = {
  notifications: [],
  unread: false,
  unreadCount: 0,
};

const NotificationsContext = React.createContext();

export const NotificationActions = {
  NOTIFICATIONS_LOADED: 'NOTIFICATIONS_LOADED',
  NOTIFICATION_RECIEVED: 'NOTIFICATION_RECIEVED',
  NOTIFICATION_VISITED: 'NOTIFICATION_VISITED',
  TOAST_CLEARED: 'TOAST_CLEARED',
};

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

export const NotificationsProvider = ({ children }) => {
  const { Provider } = NotificationsContext;
  const initialState = {
    ...defaultStates,
    notifications: [],
    unreadCount: 0,
  };
  return (
    <Provider
      value={useReducer(NotificationsReducer, initialState, initContext)}>
      <ActionCableProvider url={CHANNEL_URL}>{children}</ActionCableProvider>
    </Provider>
  );
};

const NotificationsReducer = (state, action) => {
  switch (action.type) {
    case NotificationActions.NOTIFICATIONS_LOADED:
      return loadNotifications(state, action);
    case NotificationActions.NOTIFICATION_RECIEVED:
      return receiveNotification(action, state);
    case NotificationActions.NOTIFICATION_VISITED:
      return visitNotification(state, action);
    case NotificationActions.TOAST_CLEARED:
      return clearToast(state);
    default:
      throw Error(
        `Action: ${action.type} is not defined in notifications reducer`,
      );
  }
};
