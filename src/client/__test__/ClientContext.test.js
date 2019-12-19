import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Button from '@material-ui/core/Button';
import { ClientProvider, useClientState } from '../context';
import {
  SET_ERROR_MESSAGE,
  UPDATE_CLIENTS,
  UPDATE_CURRENT_CLIENT,
  VERIFY_CLIENT,
  VERIFY_CURRENT_CLIENT,
} from '../context/actionTypes';

const ClientTestComponent = () => {
  const [{ clients, currentClient, errorMessage }, dispatch] = useClientState();

  return (
    <div>
      {clients.map((client) => (
        <p key={client[1]} data-testid={client[0]}>
          {client[6].toString()}
        </p>
      ))}
      <Button
        data-testid={'UpdateClientsBtn'}
        onClick={() =>
          dispatch({
            type: UPDATE_CLIENTS,
            payload: [
              [
                'test_uuid',
                'test_name',
                'test_owner_name',
                'test_address',
                'image_link',
                true,
                { coordinates: [200, 200] },
                [{ phone_number: '0123456789' }],
              ],
            ],
          })
        }
      />
      <p data-testid='error-message'>{errorMessage.toString()}</p>
      <Button
        data-testid={'set-error-message'}
        onClick={() =>
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'error',
          })
        }
      />
      ({' '}
      {currentClient && (
        <p key={currentClient.name} data-testid={currentClient.uuid}>
          {currentClient.verified.toString()}
        </p>
      )}
      )
      <Button
        data-testid={'UpdateCurrentClientBtn'}
        onClick={() =>
          dispatch({
            type: UPDATE_CURRENT_CLIENT,
            payload: {
              uuid: 'test_uuid_client',
              name: 'test_name',
              ownerName: 'test_owner_name',
              address: 'test_address',
              image_link: 'image_link',
              contacts: [{ phone_number: '0123456789' }],
              verified: false,
              location: { coordinates: [200, 200] },
            },
          })
        }
      />
      <Button
        data-testid={'VerifyClientBtn'}
        onClick={() =>
          dispatch({
            type: VERIFY_CLIENT,
            payload: { uuid: 'test_uuid' },
          })
        }
      />
      <Button
        data-testid={'VerifyClientBtn2'}
        onClick={() =>
          dispatch({
            type: VERIFY_CURRENT_CLIENT,
          })
        }
      />
    </div>
  );
};

describe('Client Context', () => {
  it('should have clients state in context', () => {
    const wrapper = (
      <ClientProvider
        initialValue={{
          clients: [
            [
              'test_uuid',
              'test_name',
              'test_owner_name',
              'test_address',
              'image_link',
              true,
              { coordinates: [200, 200] },
              [{ phone_number: '0123456789' }],
            ],
          ],
        }}>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('test_uuid')).toBeDefined();
  });

  it('should set default clients list to empty array in context', () => {
    const wrapper = ({ children }) => (
      <ClientProvider>{children}</ClientProvider>
    );
    const { getByTestId } = render(
      <ClientProvider>
        <ClientTestComponent />
      </ClientProvider>,
    );
    expect(() => getByTestId('test_uuid')).toThrow(Error);
  });

  it('should update clients with given list', async () => {
    const wrapper = (
      <ClientProvider>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    const updateBtn = getByTestId('UpdateClientsBtn');

    fireEvent.click(updateBtn);
    const user = getByTestId('test_uuid');
    expect(user).toBeDefined();
  });

  it('should have errorMessage state in context', () => {
    const wrapper = (
      <ClientProvider>
        <ClientTestComponent />
      </ClientProvider>
    );

    const { getByTestId } = render(wrapper);
    expect(getByTestId('error-message')).toBeDefined();
    expect(getByTestId('error-message').innerHTML).toEqual('');
  });

  it('should set errorMessage state', () => {
    const wrapper = (
      <ClientProvider>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('error-message')).toBeDefined();
    expect(getByTestId('error-message').innerHTML).toEqual('');
    const insertDialogBtn = getByTestId('set-error-message');

    expect(insertDialogBtn).toBeDefined();
    fireEvent.click(insertDialogBtn);
    expect(getByTestId('error-message').innerHTML).toEqual('error');
  });

  it('should have currentClient state in context', () => {
    const wrapper = (
      <ClientProvider
        initialValue={{
          currentClient: {
            uuid: 'test_uuid_client',
            name: 'test_name',
            ownerName: 'test_owner_name',
            address: 'test_address',
            image_link: 'image_link',
            contacts: [{ phone_number: '0123456789' }],
            verified: false,
            location: { coordinates: [200, 200] },
          },
        }}>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('test_uuid_client')).toBeDefined();
  });

  it('should update currentClient with client', async () => {
    const wrapper = (
      <ClientProvider>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    const updateBtn = getByTestId('UpdateCurrentClientBtn');

    fireEvent.click(updateBtn);
    const user = getByTestId('test_uuid_client');
    expect(user).toBeDefined();
  });

  it('should update verify client in clients list', async () => {
    const wrapper = (
      <ClientProvider
        initialValue={{
          clients: [
            [
              'test_uuid',
              'test_name',
              'test_owner_name',
              'test_address',
              'image_link',
              [{ phone_number: '0123456789' }],
              false,
              { coordinates: [200, 200] },
            ],
          ],
        }}>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    const updateBtn = getByTestId('VerifyClientBtn');

    fireEvent.click(updateBtn);
    const user = getByTestId('test_uuid');
    expect(user).toBeDefined();
    expect(user.innerHTML).toBe('true');
  });

  it('should update verify client in currentClient', async () => {
    const wrapper = (
      <ClientProvider
        initialValue={{
          currentClient: {
            uuid: 'test_unverified_uuid',
            name: 'test_name',
            ownerName: 'test_owner_name',
            address: 'test_address',
            image_link: 'image_link',
            contacts: [{ phone_number: '0123456789' }],
            verified: false,
            location: { coordinates: [200, 200] },
          },
        }}>
        <ClientTestComponent />
      </ClientProvider>
    );
    const { getByTestId } = render(wrapper);
    const updateBtn = getByTestId('VerifyClientBtn2');

    fireEvent.click(updateBtn);
    const user = getByTestId('test_unverified_uuid');
    expect(user).toBeDefined();
    expect(user.innerHTML).toBe('true');
  });
});
