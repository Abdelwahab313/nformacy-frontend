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
import * as toastManager from 'react-toastify';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import UserFactorySetup from '__test__/factory/userFactory';

const createMessage = (notification = null) => {
  const sampleNotification = {
    id: 1,
    messageKey: 'test',
    messageParameters: { referenceNumber: 1 },
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
        unseenNotificationsCount: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
        unseenNotificationsCount: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
        unseenNotificationsCount: 5,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
        );
        const { result, waitForNextUpdate } = renderHook(
          () => useNotification(),
          {
            wrapper,
          },
        );
        await waitForNextUpdate();
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
        unseenNotificationsCount: 10,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
    //flaky test
    it('should show toast when it receives new notification', async (testDone) => {
      const mockedNotification = NotificationMessage();
      const spy = jest.spyOn(toastManager, 'toast');
      const recentNotificationsResponse = {
        notifications: [],
        unseenNotificationsCount: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
            'notifications:pending_adviser_acceptance',
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
        unseenNotificationsCount: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
        unseenNotificationsCount: 6,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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

    it('should retrieve notifications from server on firs render and set unread based on unseenNotificationsCount', async () => {
      const initialNotifications = createUserNotification(10);
      const recentNotificationsResponse = {
        notifications: initialNotifications,
        unseenNotificationsCount: 0,
      };
      mock.onGet().reply(200, recentNotificationsResponse);
      await act(async () => {
        UserFactorySetup.generateUser();
        const wrapper = ({ children }) => (
          <NotificationsProvider>{children}</NotificationsProvider>
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
});
