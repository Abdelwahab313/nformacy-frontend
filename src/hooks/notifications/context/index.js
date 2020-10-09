import React, { useContext, useReducer } from 'react';
import { ActionCableProvider } from '../../useActionCable';
import { CHANNEL_URL } from '../../../settings';
import { clearToast, closeMenu, receiveNotification, toggleMenu, visitNotification } from './actions';

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
  toastCleared: 'toastCleared',
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

const NotificationsReducer = (state, action) => {
  switch (action.type) {
    case notificationActions.notificationReceived:
      return receiveNotification(action, state);
    case notificationActions.menuToggled:
      return toggleMenu(state, action);
    case notificationActions.menuClosed:
      return closeMenu(state);
    case notificationActions.notificationVisited:
      return visitNotification(state, action);
    case notificationActions.toastCleared:
      return clearToast(state);
    default:
      throw Error(
        `Action: ${action.type} is not defined in notifications reducer`,
      );
  }
};
