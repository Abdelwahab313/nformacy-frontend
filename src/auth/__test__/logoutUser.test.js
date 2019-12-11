import React from 'react';
import axios from 'axios';
import * as AuthContextModule from '../auth';
import { AuthContext } from '../auth';
import Logout from '../LogoutUser';
import { API_BASE_URL } from '../../settings';
import LocalStorageMock from '../../__test__/localStorage';
import { MemoryRouter } from 'react-router';
import { render, act } from '@testing-library/react';

jest.mock('axios');
axios.mockResolvedValue();
describe('logout user axios', () => {
  let tree;
  let wrapper;
  beforeEach(async () => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', 'testToken');
    global.localStorage.setItem('users', 'testUser');
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        response: { status: ['200'] },
      }),
    );
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
      setAuthTokens: () => {},
      setLoggedInUser: () => {},
      setLoadedLocal: () => {},
    }));
    tree = (
      <MemoryRouter>
        <AuthContext.Provider>
          <Logout />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    await act(async () => {
      wrapper = render(tree);
    });
  });
  it('should call logout api once', () => {
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
