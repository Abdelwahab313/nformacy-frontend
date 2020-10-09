import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider } from '../../../pages/auth/context/auth';
import useNotification from '../../../hooks/notifications/useNotification';
import {
  NotificationsProvider,
  useNotificationsContext,
  notificationActions,
} from '../../../hooks/notifications/context';
import { NotificationMessage } from '../../factory/notification';

const TestComponent = () => {
  const [
    { notifications, unread, unreadCount },
    dispatch,
  ] = useNotificationsContext();

  return { dispatch, notifications, unread, unreadCount };
};

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
      const mockedDate = 1602184753309;
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
          payload: { notificationId: newNotification.notification_id },
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

    it('should set notifications as unread', () => {
      const newNotification = NotificationMessage();
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
          payload: { notificationId: newNotification.notification_id },
        }),
      );

      expect(testComponentResult.current.unreadCount).toBe(0);
      expect(testComponentResult.current.unread).toBe(true);
    });
  });

  it('should raise an error if consumer is not wrapped in NotificationsProvider', async () => {
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
