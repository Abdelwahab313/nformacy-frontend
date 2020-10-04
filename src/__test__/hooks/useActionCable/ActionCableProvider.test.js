import { renderHook } from '@testing-library/react-hooks';
import { ActionCableProvider } from '../../../hooks/useActionCable';
import { CHANNEL_URL } from '../../../settings';
import React, { useContext } from 'react';
import { ActionCableContext } from '../../../hooks/useActionCable/context';
import LocalStorageMock from '../../localStorage';

const MockedConsumer = () => {
  const { conn } = useContext(ActionCableContext);

  return { conn };
};
describe('ActionCableProvider', () => {
  it('should initiate connection with jwt token', async () => {
    const jwt = '{ "jwt":"test"}';
    global.LocalStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', jwt);

    const wrapper = ({ children }) => (
      <ActionCableProvider url={CHANNEL_URL}>{children}</ActionCableProvider>
    );
    const { result } = renderHook(() => MockedConsumer(), {
      wrapper,
    });

    const expectedToken = JSON.parse(jwt).token;
    expect(result.current.conn.jwt.token).toEqual(expectedToken);
  });
});
