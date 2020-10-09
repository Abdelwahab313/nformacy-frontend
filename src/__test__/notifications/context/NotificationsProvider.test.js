import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider } from '../../../pages/auth/context/auth';
import useNotification from '../../../hooks/notifications/useNotification';
import {
  notificationActions,
  NotificationsProvider,
  useNotificationsContext,
} from '../../../hooks/notifications/context';
import { NotificationMessage } from '../../factory/notification';
import { Router } from 'react-router';
import { Server } from 'mock-socket';
import { CHANNEL_URL } from '../../../settings';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import history from '../../../services/navigation';

const TestComponent = () => {
  const [
    { notifications, unread, unreadCount, menuOpened },
    dispatch,
  ] = useNotificationsContext();

  return { dispatch, notifications, unread, unreadCount, menuOpened };
};

const mock = new MockAdapter(axios);

describe('NotificationsProvider', () => {
  describe('Provider with default Values', () => {
    let wrapper,
      result,
      unMountRenderedHook,
      dispatchToTestComponent,
      testComponentResult;

    beforeEach(() => {
      wrapper = ({ children }) => (
        <AuthProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </AuthProvider>
      );
      const rendered = renderHook(() => useNotification(), {
        wrapper,
      });
      const testComponent = renderHook(() => TestComponent(), {
        wrapper,
      });
      result = rendered.result;
      unMountRenderedHook = rendered.unmount;
      dispatchToTestComponent = testComponent.result.current.dispatch;
      testComponentResult = testComponent.result;
    });

    afterEach(() => {
      unMountRenderedHook();
    });

    it('should be used within NotificationsProvider and provides initial value for notifications', () => {
      expect(result.current.notifications).toEqual([]);
    });

    it('should add a notification to notifications state once dispatching receivedNotification action', () => {
      expect(testComponentResult.current.notifications.length).toEqual(0);

      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationReceived,
          payload: { notification: NotificationMessage() },
        }),
      );

      expect(testComponentResult.current.notifications.length).toEqual(1);
    });

    it('should not add a notification to notifications if its already in the state', () => {
      const sameNotification = NotificationMessage();
      const notifications = [
        { notificationId: sameNotification.notification_id },
      ];
      const wrapper = ({ children }) => (
        <NotificationsProvider initialNotifications={notifications}>
          {children}
        </NotificationsProvider>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });
      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationReceived,
          payload: { notification: sameNotification },
        }),
      );

      expect(result.current.notifications.length).toEqual(1);
    });

    it('Should set notifications as unread when it dispatch receivedNotification action', () => {
      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationReceived,
          payload: { notification: NotificationMessage() },
        }),
      );

      expect(testComponentResult.current.unread).toBe(true);
    });

    it('should decrease unread count and mark the passed in notification as read', () => {
      const newNotification = NotificationMessage();
      const notification = {
        notificationId: newNotification.notification_id,
        targetId: 1,
        readAt: Date.now(),
        type: 'QuestionNotification',
      };
      const mockedDate = 1602184753309;
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: 1,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      mock.onPost().reply(201, notificationAfterRead);

      Date.now = jest.fn(() => mockedDate);
      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationReceived,
          payload: { notification: newNotification },
        }),
      );

      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      expect(testComponentResult.current.unreadCount).toBe(0);
      expect(
        testComponentResult.current.notifications.find(
          (notification) =>
            notification.notificationId === newNotification.notification_id,
        ).readAt,
      ).toBe(mockedDate);
    });

    it('should set notifications as read', () => {
      const newNotification = NotificationMessage();
      const notification = {
        notificationId: newNotification.notification_id,
        targetId: 1,
        readAt: Date.now(),
        type: 'QuestionNotification',
      };
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: notification.notificationId,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      mock.onPost().reply(201, notificationAfterRead);
      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationReceived,
          payload: { notification: newNotification },
        }),
      );

      act(() =>
        dispatchToTestComponent({
          type: notificationActions.menuToggled,
          payload: { currentTarget: 'Meh' },
        }),
      );

      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      expect(testComponentResult.current.unreadCount).toBe(0);
      expect(testComponentResult.current.unread).toBe(true);
    });
  });

  describe('Navigation to specific notification', () => {
    let wrapper, mockServer, unMountRenderedHook, unMountSharedHook;

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
      const testComponent = renderHook(() => TestComponent(), {
        wrapper,
      });
      unMountRenderedHook = rendered.unmount;
      unMountSharedHook = testComponent.unmount;
    });

    function cleanHookAndSocket() {
      mockServer.stop();
      unMountSharedHook();
      unMountRenderedHook();
    }

    afterEach(() => {
      cleanHookAndSocket();
      localStorage.clear();
    });

    it('navigates to notification target', () => {
      const pushSpy = jest.spyOn(history, 'push');
      const notification = {
        notificationId: 1,
        targetId: 1,
        readAt: null,
        type: 'QuestionNotification',
      };
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: 1,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      mock.onPost().reply(201, notificationAfterRead);
      wrapper = ({ children }) => (
        <Router history={history}>
          <AuthProvider>
            <NotificationsProvider initialNotifications={[notification]}>
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </Router>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });

      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      expect(pushSpy).toHaveBeenCalledWith('/admin/questions/edit', {
        questionId: 1,
      });
    });

    it('marks notification as read', () => {
      const notification = {
        notificationId: 1,
        targetId: 1,
        readAt: null,
        type: 'QuestionNotification',
      };
      const readNotification = {
        notificationId: 1,
        targetId: 1,
        readAt: Date.now(),
        type: 'QuestionNotification',
      };
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: 1,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      wrapper = ({ children }) => (
        <Router history={history}>
          <AuthProvider>
            <NotificationsProvider
              initialNotifications={[notification, readNotification]}
              unreadCount={1}>
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </Router>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });

      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notificationAfterRead },
        }),
      );

      expect(result.current.unreadCount).toEqual(0);
    });

    it('close navigation menu', () => {
      const notification = {
        notificationId: 1,
        targetId: 1,
        readAt: null,
        type: 'QuestionNotification',
      };
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: 1,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      mock.onPost().reply(201, notificationAfterRead);
      wrapper = ({ children }) => (
        <Router history={history}>
          <AuthProvider>
            <NotificationsProvider initialNotifications={[notification]}>
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </Router>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });


      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      expect(result.current.menuOpened).toBe(null);
    });

    it('should not do any thing to the notification if its already read', () => {
      const notification = {
        notificationId: 1,
        targetId: 1,
        readAt: null,
        type: 'QuestionNotification',
      };
      wrapper = ({ children }) => (
        <Router history={history}>
          <AuthProvider>
            <NotificationsProvider initialNotifications={[notification]}>
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </Router>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });

      act(() =>
        result.current.dispatch({
          type: notificationActions.menuToggled,
          payload: { currentTarget: '' },
        }),
      );
      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      expect(result.current.menuOpened).toBe(null);
    });

    it('navigateToNotification should update localStorage with the readNotification.', (done) => {
      const notification = {
        notificationId: 1,
        targetId: 1,
        readAt: null,
        type: 'QuestionNotification',
      };
      const readAtTimeStamp = 4132987932;
      const notificationAfterRead = {
        notificationId: 1,
        targetId: 1,
        type: 'QuestionNotification',
        readAt: readAtTimeStamp,
      };
      mock.onPost().reply(201, notificationAfterRead);
      wrapper = ({ children }) => (
        <Router history={history}>
          <AuthProvider>
            <NotificationsProvider
              initialNotifications={[notification]}
              unreadCount={2}>
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </Router>
      );
      const { result } = renderHook(() => TestComponent(), {
        wrapper,
      });

      act(() =>
        result.current.dispatch({
          type: notificationActions.notificationVisited,
          payload: { notification: notification },
        }),
      );

      setTimeout(() => {
        const loadedUser = JSON.parse(localStorage.getItem('user'));
        expect(loadedUser.unreadNotifications).toEqual(1);
        expect(loadedUser.notifications[0].readAt).toEqual(readAtTimeStamp);
        done();
      }, 500);
    });
  });

  it('should raise an error if consumer is not wrapped in NotificationsProvider', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useNotification(), {
      wrapper,
    });

    try {
      result.current;
    } catch (e) {
      expect(e).toEqual(
        Error(
          'useNotificationsContext must be used within a NotificationsProvider',
        ),
      );
    }
  });

  it('should set notifications to the given notifications array as initial value', () => {
    const notifications = [1, 2, 3];
    const wrapper = ({ children }) => (
      <NotificationsProvider initialNotifications={notifications}>
        {children}
      </NotificationsProvider>
    );
    const { result } = renderHook(() => TestComponent(), {
      wrapper,
    });

    expect(result.current.notifications.length).toEqual(3);
  });
});
