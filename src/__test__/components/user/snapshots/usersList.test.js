import React from 'react';
import UsersList from '../../../../components/user/UsersList';
import * as AuthContextMoudle from '../../../../context/auth';
import { AuthContext } from '../../../../context/auth';
import { shallow } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router';

function mockAuthObject() {
  jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
    authTokens: '',
  }));
}

const testUsersList = [
  {
    first_name: 'first name',
    last_name: 'second name',
    phone_number: '01099234802',
    national_id: '29505050103981',
    username: 'omarmmali',
    date_joined: '05/05/1995',
  },
];

it('renders correctly', () => {
  mockAuthObject();

  const container = shallow(
    <AuthContext.Provider>
      <UsersList usersList={testUsersList} />
    </AuthContext.Provider>,
  );
  const tree = container.html();
  expect(tree).toMatchSnapshot();
});

it('Should route to detail view correctly', () => {
  mockAuthObject();

  const container = shallow(
    <AuthContext.Provider>
      <UsersList usersList={testUsersList} />
    </AuthContext.Provider>,
  );

  expect(container.props().userDetailsRoute).toEqual('/users/');
});
