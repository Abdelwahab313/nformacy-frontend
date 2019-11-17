import React from 'react';
import axios from 'axios';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';
import { mount } from 'enzyme';
import Logout from '../../../components/user/LogoutUser';
import { API_BASE_URL } from '../../../settings';
import LocalStorageMock from '../../localStorage';

jest.mock('axios');
axios.mockResolvedValue();
describe('logout user axios', () => {
  let tree;
  let wrapper;
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', 'testToken');
    global.localStorage.setItem('users', 'testUser');
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        response: { status: ['200'] },
      }),
    );
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
      setAuthTokens: () => {},
      setLoggedInUser: () => {},
      setLoadedLocal: () => {},
    }));
    tree = (
      <AuthContext.Provider>
        <Logout />
      </AuthContext.Provider>
    );
    wrapper = mount(tree);
  });
  it('should call logout api once', async () => {
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      headers: { Authorization: 'Bearer testToken' },
      method: 'post',
      url: `${API_BASE_URL}/auth/logout`,
    });
  });
  it('should remove tokens from localStorage', () => {
    const loadedLocal = global.localStorage.getItem('tokens');
    expect(loadedLocal).toBe(null);
  });
  it('should remove users from localStorage', () => {
    const loadedLocal = global.localStorage.getItem('users');
    expect(loadedLocal).toBe(null);
  });
});
