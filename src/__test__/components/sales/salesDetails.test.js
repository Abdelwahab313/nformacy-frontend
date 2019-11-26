import React from 'react';
import { shallow } from 'enzyme';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';
import SaleDetails from '../../../components/sales/SaleDetails';

describe('SaleDetails', () => {
  let tree;
  let wrapper;

  beforeEach(() => {
    const reactRouter = require('react-router');
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    jest.spyOn(reactRouter, 'useParams').mockImplementation(() => ({
      uuid: 'test-uuid',
    }));
    tree = (
      <AuthContext.Provider>
        <SaleDetails />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree).dive();
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
