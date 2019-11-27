import { shallow } from 'enzyme';
import * as AuthContextMoudle from '../../../../context/auth';
import { AuthContext } from '../../../../context/auth';
import React from 'react';
import UserSalesScreen from '../../../../components/user/userDetail/UserSale';

function mockAuthObject() {
  jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
    authTokens: '',
  }));
}

const testUsersList = [
  {
    uuid: 'randomstring',
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
      <UserSalesScreen user_uuid={testUsersList[0].uuid} />
    </AuthContext.Provider>,
  );
  const tree = container.html();
  expect(tree).toMatchSnapshot();
});
