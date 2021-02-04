import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider } from '../../../pages/auth/context/auth';
import useNotification from '../../../hooks/notifications/useNotification';
import {
  NotificationActions,
  NotificationsProvider,
  useNotificationsContext,
} from '../../../hooks/notifications/context';
import { NotificationMessage } from '../../factory/notification';
import { Router } from 'react-router';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { history } from '../../../services/navigation';
import UserFactorySetup from '__test__/factory/userFactory';

export const TestComponent = () => {
  const [
    { notifications, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();

  return { dispatch, notifications, unread, unreadCount };
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
          type: NotificationActions.NOTIFICATION_RECIEVED,
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
          type: NotificationActions.NOTIFICATION_RECIEVED,
          payload: { notification: sameNotification },
        }),
      );

      expect(result.current.notifications.length).toEqual(1);
    });

    it('Should set notifications as unread when it dispatch receivedNotification action', () => {
      act(() =>
        dispatchToTestComponent({
          type: NotificationActions.NOTIFICATION_RECIEVED,
          payload: { notification: NotificationMessage() },
        }),
      );

      expect(testComponentResult.current.unread).toBe(true);
    });
  });

  describe('Navigation to specific notification', () => {
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
          type: NotificationActions.NOTIFICATION_VISITED,
          payload: { notification: notificationAfterRead },
        }),
      );

      expect(result.current.unreadCount).toEqual(0);
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
