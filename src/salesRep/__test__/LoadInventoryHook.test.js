import { API_BASE_URL } from '../../settings';
import { act, renderHook } from '@testing-library/react-hooks';
import LoadInventory from '../hooks/LoadInventory';
import LocalStorageMock from '../../__test__/localStorage';
import * as AuthContextMoudle from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import * as SalesRepContextModule from '../context';
import { useSalesRepState } from '../context';
import * as ProductContextModule from '../../product/context/context';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { SET_ERROR_MESSAGE, UPDATE_USERS } from '../context/contextAction';

let mockedState = { addedProducts: [] };
const mockedDispatch = (action) => {
  switch (action.type) {
    case UPDATE_USERS:
      mockedState.users = action.payload;
      break;
    case SET_ERROR_MESSAGE:
      mockedState.errorMessage = action.payload;
      break;
    default:
      break;
  }
};
const useSalesRepMock = () => {
  return [mockedState, mockedDispatch];
};

const mock = new MockAdapter(axios);
describe('LoadInventory Hook', () => {
  let wrapper;
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    const testToken = 'testToken';
    global.localStorage.setItem('tokens', testToken);
    global.localStorage.setItem('users', 'testUser');
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: testToken,
      setAuthTokens: () => {},
    }));
    jest
      .spyOn(SalesRepContextModule, 'useSalesRepState')
      .mockImplementation(useSalesRepMock);
    jest
      .spyOn(ProductContextModule, 'useProductState')
      .mockImplementation(useSalesRepMock);
    wrapper = ({ children }) => (
      <AuthContext.Provider>{children} </AuthContext.Provider>
    );
    mockedState = { addedProducts: [], errorMessage: '' };
  });
  it('should submit addedProducts and set loading state to true', async () => {
    mock.onGet(`${API_BASE_URL}/inventory/transaction/`).reply(200);
    const spy = jest.spyOn(axios, 'post');
    let result;
    await act(async () => {
      result = renderHook(
        () =>
          LoadInventory({
            salesRep: ['test_uid'],
            closeForm: () => {},
          }),
        {
          wrapper,
        },
      ).result;
    });
    result.current.submit();
    expect(spy).toHaveBeenCalledWith(
      `${API_BASE_URL}/inventory/transaction/`,
      { products: [], to_uuid: 'test_uid' },
      { headers: { Authorization: 'Bearer undefined' } },
    );
  });
});
