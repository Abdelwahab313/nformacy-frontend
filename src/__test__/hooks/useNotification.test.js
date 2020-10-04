import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useNotification from '../../hooks/useNotification';
import { ActionCableProvider } from '../../hooks/useActionCable';
import { CHANNEL_URL, NOTIFICATION_CHANNEL_IDENTIFIER } from '../../settings';
import { Server } from 'mock-socket';

const createMessage = (id, message_key) => {
  return JSON.stringify({
    identifier: `{"channel":"${NOTIFICATION_CHANNEL_IDENTIFIER}"}`,
    message: {
      id,
      message_key,
    },
  });
};

describe('Notifications', () => {
  let mockServer, wrapper, result;

  beforeEach(() => {
    mockServer = new Server(CHANNEL_URL);
    wrapper = ({ children }) => (
      <ActionCableProvider url={CHANNEL_URL}>{children}</ActionCableProvider>
    );
    const rendered = renderHook(() => useNotification(), {
      wrapper,
    });
    result = rendered.result;
  });

  afterEach(() => {
    mockServer.stop();
  });

  it('Should add a notification when it receives one', (testDone) => {
    expect(result.current.notifications.length).toEqual(0);

    mockServer.on('connection', (socket) => {
      act(() => {
        socket.send(createMessage(1, 'test'));
      });
      expect(result.current.notifications.length).toEqual(1);
      testDone();
    });
  });

  it('Should add a notification on top of old one when it receives new one', (testDone) => {
    expect(result.current.notifications.length).toEqual(0);

    mockServer.on('connection', async (socket) => {
      await act(async () => {
        socket.send(createMessage(1, 'test'));
        socket.send(createMessage(2, 'test2'));
      });
      expect(result.current.notifications.length).toEqual(2);
      expect(result.current.notifications[0]).toEqual('test2');
      testDone();
    });
  });

  it('Should set notifications as unopened when it receives notification', (testDone) => {
    act(() => result.current.openNotification({ currentTarget: 'a' }));
    expect(result.current.notificationsUnopened).toEqual(false);

    mockServer.on('connection', (socket) => {
      act(() => {
        socket.send(createMessage(1, 'test'));
      });
      expect(result.current.notificationsUnopened).toEqual(true);
      testDone();
    });
  });

  it('Should close menu', () => {
    act(() => {
      const message = JSON.parse(createMessage(1, 'test')).message;
      return result.current.addNotification(message);
    });
    act(() => result.current.openNotification({ currentTarget: 'a' }));
    expect(result.current.notificationMenuOpened).toEqual('a');

    act(() => result.current.closeNotification());

    expect(result.current.notificationMenuOpened).toEqual(null);
  });

  it('Should open menu and hide notifications count', async () => {
    act(() => {
      const message = JSON.parse(createMessage(1, 'test')).message;
      return result.current.addNotification(message);
    });
    expect(result.current.notificationMenuOpened).toEqual(null);
    expect(result.current.notificationsUnopened).toEqual(true);

    act(() => result.current.openNotification({ currentTarget: 'a' }));

    expect(result.current.notificationMenuOpened).toEqual('a');
    expect(result.current.notificationsUnopened).toEqual(false);
  });

  it('Should open menu only if there are notifications', () => {
    expect(result.current.notificationMenuOpened).toEqual(null);

    act(() => result.current.openNotification({ currentTarget: 'a' }));

    expect(result.current.notificationMenuOpened).toEqual(null);
  });
});
