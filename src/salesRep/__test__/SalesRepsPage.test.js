import { act, render } from '@testing-library/react';
import * as AuthContextMoudle from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import SalesRepsPage from '../SalesRepsPage';
import React from 'react';
import { SalesRepProvider } from '../context';
import { convertObjectToArray } from '../utils';

describe('SalesRepsPage snapshot test', () => {
  it('should render SalesRepsPage correctly', async () => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
    }));
    const test_user_1 = {
      uuid: 'test_uuid1',
      first_name: 'fname',
      last_name: 'lname',
      phone_number: '0123456789',
      national_id: '201378375363737',
      username: 'test_user1',
      date_joined: Date.now().toString(),
    };
    const test_user_2 = {
      uuid: 'test_uuid2',
      first_name: 'fname',
      last_name: 'lname',
      phone_number: '0123456788',
      national_id: '201378375363337',
      username: 'test_user2',
      date_joined: Date.now().toString(),
    };
    const users = [
      convertObjectToArray(test_user_1),
      convertObjectToArray(test_user_2),
    ];
    let asFragment;
    await act(async () => {
      asFragment = render(
        <AuthContext.Provider>
          <SalesRepProvider initialValue={{ users: users }}>
            <SalesRepsPage />
          </SalesRepProvider>
        </AuthContext.Provider>,
      ).asFragment();
    });

    expect(asFragment).toMatchSnapshot();
  });
});
