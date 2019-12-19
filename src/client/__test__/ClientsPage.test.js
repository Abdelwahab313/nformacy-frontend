import { render } from '@testing-library/react';
import * as AuthContextModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import React from 'react';
import { ClientProvider } from '../context';
import ClientsPage from '../ClientsPage';
import ClientsFetcher from '../hooks/ClientsFetcher';

jest.mock('../hooks/ClientsFetcher');
describe('ClientsFetcher Presentation', () => {
  it('should render clients page correctly', () => {
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
    }));
    ClientsFetcher.mockImplementationOnce(() => [false, 'setter']);
    const clients = [
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
    ];
    const { asFragment } = render(
      <AuthContext.Provider>
        <ClientProvider initialValue={{ clients: clients }}>
          <ClientsPage />
        </ClientProvider>
      </AuthContext.Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
