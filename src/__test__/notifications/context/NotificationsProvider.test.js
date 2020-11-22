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
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {history} from '../../../services/navigation';

export const TestComponent = () => {
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
      expect(testComponentResult.current.notifications).toEqual([]);
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
  });

  describe('Navigation to specific notification', () => {
    it('navigates to notification target', async () => {
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
      const recentNotificationsResponse = {
        notifications: [notification],
        unreadNotifications: 1,
      };
      mock.onGet().reply(200, recentNotificationsResponse);

      await act(async () => {
        const wrapper = ({ children }) => (
          <AuthProvider>
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

        result.current.visitNotification(notification);
        await waitForNextUpdate();
      });
      expect(pushSpy).toHaveBeenCalledWith('/admin/questions/edit', {
        questionId: 1,
      });
    });

    it('marks notification as read', async () => {
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
      const wrapper = ({ children }) => (
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
      const wrapper = ({ children }) => (
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
});
