import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useNotification from '../../../hooks/notifications/useNotification';
import {
  CHANNEL_URL,
  NOTIFICATION_CHANNEL_IDENTIFIER,
} from '../../../settings';
import { Server } from 'mock-socket';
import { NotificationMessage } from '../../factory/notification';
import { NotificationsProvider } from '../../../hooks/notifications/context';
import { AuthProvider } from '../../../pages/auth/context/auth';
import * as toastManager from 'react-toastify';
import getPathForNotification from '../../../services/notificationPathResolver';
import { RoutesPaths } from '../../../constants/routesPath';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

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
    notifications.push(NotificationMessage({}, read));
  }
  return notifications;
};
const mock = new MockAdapter(axios);
describe('Notifications', () => {
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(CHANNEL_URL);
  });

  function cleanHookAndSocket() {
    mockServer.stop();
  }

  afterEach(() => {
    cleanHookAndSocket();
  });

  describe('Notifications and websocket', () => {
    it('Should add a notification when it receives one', async (testDone) => {
      const recentNotificationsResponse = {
        notifications: [],
        unreadNotifications: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();
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
    });

    it('Should add a notification on top of old one when it receives new one', async (testDone) => {
      const recentNotificationsResponse = {
        notifications: [],
        unreadNotifications: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();
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
    });

    it('Should set notifications as unread when it receives notification', async (testDone) => {
      const initialNotifications = createUserNotification(5);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unreadNotifications: 5,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();
        result.current.toggleMenu({ currentTarget: 'a' });
        expect(result.current.unread).toEqual(false);

        mockServer.on('connection', (socket) => {
          act(() => {
            socket.send(createMessage(2, 'test'));
          });
          expect(result.current.unread).toEqual(true);
          testDone();
        });
      });
    });

    it('notification should not exceed 10', async (testDone) => {
      const initialNotifications = createUserNotification(10);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unreadNotifications: 10,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();

        mockServer.on('connection', async (socket) => {
          expect(result.current.notifications.length).toEqual(10);
          act(() => {
            socket.send(createMessage(NotificationMessage()));
          });
          expect(result.current.notifications.length).toEqual(10);
          testDone();
        });
      });
    });

    it('should show toast when it receives new notification', async (testDone) => {
      const mockedNotification = NotificationMessage();
      const spy = jest.spyOn(toastManager, 'toast');
      const recentNotificationsResponse = {
        notifications: [],
        unreadNotifications: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();

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

    it('mark notification as read notification', async (testDone) => {
      const recentNotificationsResponse = {
        notifications: [],
        unreadNotifications: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();
        expect(result.current.notifications.length).toEqual(0);

        mockServer.on('connection', (socket) => {
          act(() => {
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
    });

    it('should retrieve notifications from server on firs render', async () => {
      const initialNotifications = createUserNotification(10);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unreadNotifications: 6,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate, waitForValueToChange } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();

        await waitForValueToChange(() => result.current.notifications);

        expect(result.current.notifications.length).toEqual(10);
        expect(result.current.unreadCount).toEqual(6);
        expect(result.current.unread).toEqual(true);
      });
    });

    it('should retrieve notifications from server on firs render and set unread based on unreadNotifications', async () => {
      const initialNotifications = createUserNotification(10);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unreadNotifications: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const { result, waitForNextUpdate, waitForValueToChange } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();

        await waitForValueToChange(() => result.current.notifications);

        expect(result.current.notifications.length).toEqual(10);
        expect(result.current.unreadCount).toEqual(0);
        expect(result.current.unread).toEqual(false);
      });
    });
  });

  describe('Notifications menu', () => {
    let result;
    beforeEach(async () => {
      cleanHookAndSocket();
      mockServer = new Server(CHANNEL_URL);
      const initialNotifications = createUserNotification(10);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unreadNotifications: 10,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        const currentUser = { user: 'test' };
        const wrapper = ({ children }) => (
          <AuthProvider initialValue={{ currentUser }}>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        );
        const rendered = renderHook(() => useNotification(), {
          wrapper,
        });
        result = rendered.result;
        await rendered.waitForNextUpdate();
      });
    });

    it('Should close menu', () => {
      act(() => result.current.toggleMenu({ currentTarget: 'a' }));
      expect(result.current.menuOpened).toEqual('a');

      act(() => result.current.closeNotification());

      expect(result.current.menuOpened).toEqual(null);
    });

    it('toggleMenu Should close menu if menu is opened', async () => {
      const currentTarget = { contains: () => true };
      act(() => result.current.toggleMenu({ currentTarget: currentTarget }));
      expect(result.current.menuOpened).toEqual(currentTarget);

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
