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
  const [{ notifications, unread }, dispatch] = useNotificationsContext();

  return { dispatch, notifications, unread };
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
          payload: NotificationMessage(),
        }),
      );

      expect(testComponentResult.current.notifications.length).toEqual(1);
    });

    it('should set notifications empty array array as initial value if none given', () => {
      expect(result.current.notifications.length).toEqual(0);
    });

    it('Should set notifications as unread when it dispatch receivedNotification action', () => {
      act(() =>
        dispatchToTestComponent({
          type: notificationActions.notificationReceived,
          payload: NotificationMessage(),
        }),
      );

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
