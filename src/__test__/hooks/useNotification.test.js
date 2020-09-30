import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useNotification from '../../hooks/useNotification';
import { ActionCableProvider } from 'use-action-cable';
import { CHANNEL_URL } from '../../settings';

describe('Notifications', () => {
  it('Should add a notification to the beginning of notifications', async () => {
    const wrapper = ({ children }) => <ActionCableProvider url={CHANNEL_URL}>{children}</ActionCableProvider>
    const { result, waitForNextUpdate } = renderHook(() => useNotification(), { wrapper });

    expect(result.current.notifications).toEqual([]);

    await act(async () => {
      result.current.addNotification('a');
      await waitForNextUpdate();
      result.current.addNotification('b');

      expect(result.current.notifications).toEqual(["b", "a"]);
      expect(result.current.notificationsUnopened).toEqual(true);
    });
  });
});
