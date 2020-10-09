import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useNotification from '../../../hooks/notifications/useNotification';
import {
  CHANNEL_URL,
  NOTIFICATION_CHANNEL_IDENTIFIER,
} from '../../../settings';
import { Server } from 'mock-socket';
import {
  NotificationMessage,
  UserNotification,
} from '../../factory/notification';
import { NotificationsProvider } from '../../../hooks/notifications/context';
import { AuthProvider } from '../../../pages/auth/context/auth';
import * as toastManager from 'react-toastify';
import getPathForNotification from '../../../services/notificationPathResolver';
import { RoutesPaths } from '../../../constants/routesPath';

const createMessage = (notification = null) => {
  const sampleNotification = {
    id: 1,
    messageKey: 'test',
    readAt: Date.now(),
    createdAt: Date.now(),
    type: 'QuestionNotification',
  };
  const toBeSentMessage = notification || sampleNotification;
  return JSON.stringify({
    identifier: `{"channel":"${NOTIFICATION_CHANNEL_IDENTIFIER}"}`,
    message: toBeSentMessage,
  });
};

export const createUserNotification = (numberOfNotifications, read = false) => {
  const notifications = [];
  for (let i = 0; i < numberOfNotifications; i++) {
    notifications.push(UserNotification({}, read));
  }
  return notifications;
};

describe('Notifications', () => {
  let mockServer, wrapper, result, unMountSharedHook;

  beforeEach(() => {
    mockServer = new Server(CHANNEL_URL);
    wrapper = ({ children }) => (
      <AuthProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AuthProvider>
    );
    const rendered = renderHook(() => useNotification(), {
      wrapper,
    });
    result = rendered.result;
    unMountSharedHook = rendered.unmount;
  });

  function cleanHookAndSocket() {
    mockServer.stop();
    unMountSharedHook();
  }

  afterEach(() => {
    cleanHookAndSocket();
  });

  describe('Notifications and websocket', () => {
    it('Should add a notification when it receives one', (testDone) => {
      expect(result.current.notifications.length).toEqual(0);

      mockServer.on('connection', (socket) => {
        const mockedNotification = NotificationMessage();

        act(() => {
          socket.send(createMessage(mockedNotification));
        });

        expect(result.current.notifications.length).toEqual(1);
        expect(result.current.notifications[0].notificationId).toEqual(
          mockedNotification.notification_id,
        );
        expect(result.current.notifications[0].targetId).toEqual(
          mockedNotification.target_id,
        );
        expect(result.current.notifications[0].messageKey).toEqual(
          mockedNotification.message_key,
        );
        expect(
          JSON.stringify(result.current.notifications[0].createdAt),
        ).toEqual(JSON.stringify(mockedNotification.created_at));
        expect(result.current.notifications[0].readAt).toBeNull();
        expect(result.current.notifications[0].type).toEqual(
          'QuestionNotification',
        );
        testDone();
      });
    });

    it('Should add a notification on top of old one when it receives new one', (testDone) => {
      expect(result.current.notifications.length).toEqual(0);

      mockServer.on('connection', async (socket) => {
        await act(async () => {
          const mockedNotification = NotificationMessage();

          socket.send(createMessage(mockedNotification));
          socket.send(
            createMessage({
              ...mockedNotification,
              notification_id: 2,
              message_key: 'test2',
            }),
          );
        });

        expect(result.current.notifications.length).toEqual(2);
        expect(result.current.notifications[0].messageKey).toEqual('test2');
        testDone();
      });
    });

    it('Should set notifications as unread when it receives notification', (testDone) => {
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      const fullNotificationList = [UserNotification()];
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider initialNotifications={fullNotificationList}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );
      const { result } = renderHook(() => useNotification(), {
        wrapper,
      });
      act(() => result.current.toggleMenu({ currentTarget: 'a' }));
      expect(result.current.unread).toEqual(false);

      mockServer.on('connection', (socket) => {
        act(() => {
          socket.send(createMessage(2, 'test'));
        });
        expect(result.current.unread).toEqual(true);
        testDone();
      });
    });

    it('notification should not exceed 10', (testDone) => {
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      const fullNotificationList = createUserNotification(10);
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider initialNotifications={fullNotificationList}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );
      const { result } = renderHook(() => useNotification(), {
        wrapper,
      });

      expect(result.current.notifications.length).toEqual(10);
      mockServer.on('connection', (socket) => {
        act(() => {
          socket.send(createMessage(NotificationMessage()));
        });
        expect(result.current.notifications.length).toEqual(10);
        testDone();
      });
    });

    it('should accept number of unread notifications of initial notifications', () => {
      const unread = 10;
      const allNotifications = createUserNotification(unread);
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider
            initialNotifications={allNotifications}
            unreadCount={unread}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );

      const { result } = renderHook(() => useNotification(), {
        wrapper,
      });

      expect(result.current.unreadCount).toEqual(10);
    });

    it('should update number of unread notifications count in localstorage when it receives new notification', (testDone) => {
      const unread = 7;
      const allNotifications = createUserNotification(unread);
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider
            initialNotifications={allNotifications}
            unreadCount={unread}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );

      renderHook(() => useNotification(), {
        wrapper,
      });

      mockServer.on('connection', async (socket) => {
        await act(async () => {
          const mockedNotification = NotificationMessage();
          socket.send(createMessage(mockedNotification));
        });

        const loadedUser = JSON.parse(localStorage.getItem('user'));
        expect(loadedUser.unreadNotifications).toEqual(8);
        testDone();
      });
    });

    it('should update notifications in localstorage when it receives new notification', (testDone) => {
      cleanHookAndSocket();
      const unread = 8;
      const allNotifications = createUserNotification(unread);
      mockServer = new Server(CHANNEL_URL);
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider
            initialNotifications={allNotifications}
            unreadCount={unread}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );

      renderHook(() => useNotification(), {
        wrapper,
      });

      mockServer.on('connection', async (socket) => {
        await act(async () => {
          const mockedNotification = NotificationMessage();
          socket.send(createMessage(mockedNotification));
        });

        const loadedUser = JSON.parse(global.localStorage.getItem('user'));
        expect(loadedUser.notifications.length).toEqual(9);
        testDone();
      });
    });

    it('should show toast when it receives new notification', (testDone) => {
      const mockedNotification = NotificationMessage();
      const spy = jest.spyOn(toastManager, 'toast');

      mockServer.on('connection', async (socket) => {
        await act(async () => {
          socket.send(createMessage(mockedNotification));
        });

        expect(result.current.notifications.length).toEqual(1);
        expect(spy).toHaveBeenCalledWith(
          mockedNotification.message_key,
          expect.objectContaining({
            toastId: mockedNotification.notification_id,
          }),
        );
        testDone();
      });
    });
  });

  describe('Notifications menu', () => {
    beforeEach(() => {
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      const unreadCount = 10;
      const notifications = createUserNotification(unreadCount);
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider
            initialNotifications={notifications}
            unreadCount={unreadCount}>
            {children}
          </NotificationsProvider>
        </AuthProvider>
      );
      const rendered = renderHook(() => useNotification(), {
        wrapper,
      });
      result = rendered.result;
    });

    it('Should close menu', () => {
      act(() => result.current.toggleMenu({ currentTarget: 'a' }));
      expect(result.current.menuOpened).toEqual('a');

      act(() => result.current.closeNotification());

      expect(result.current.menuOpened).toEqual(null);
    });

    it('toggleMenu Should open menu and set notification to be read if menu is closed', async () => {
      expect(result.current.menuOpened).toEqual(null);
      expect(result.current.unread).toEqual(true);

      act(() => result.current.toggleMenu({ currentTarget: 'a' }));

      expect(result.current.menuOpened).toEqual('a');
      expect(result.current.unread).toEqual(false);
    });

    it('toggleMenu Should close menu if menu is opened', async () => {
      const currentTarget = { contains: () => true };
      act(() => result.current.toggleMenu({ currentTarget: currentTarget }));
      expect(result.current.menuOpened).toEqual(currentTarget);
      expect(result.current.unread).toEqual(false);

      act(() => result.current.toggleMenu({ target: 'a' }));

      expect(result.current.menuOpened).toEqual(null);
    });

    it('should return path for notification of type QuestionNotification with required param for the path', () => {
      const notification = { targetId: 1, type: 'QuestionNotification' };

      const redirectionPath = getPathForNotification(notification);

      const expectedPath = {
        path: RoutesPaths.Admin.QuestionsDetails,
        params: { questionId: notification.targetId },
      };
      expect(JSON.stringify(redirectionPath)).toEqual(
        JSON.stringify(expectedPath),
      );
    });
  });
});
