import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { API_BASE_URL } from '../../settings';
import * as AuthContextMoudle from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import LocalStorageMock from '../../__test__/localStorage';
import SalesRepsFetcher from '../hooks/SalesRepsFetcher';
import * as SalesRepContextModule from '../context';
import { useSalesRepState } from '../context';
import { SET_ERROR_MESSAGE, UPDATE_USERS } from '../context/contextAction';

let mockedState = undefined;
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
const TestHook = () => {
  const [state, dispatch] = useSalesRepState();
  return { state, dispatch };
};

const mock = new MockAdapter(axios);
describe('SaleRepFetcher Hook', () => {
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
    wrapper = ({ children }) => (
      <AuthContext.Provider>{children} </AuthContext.Provider>
    );
    mockedState = { users: [], errorMessage: '' };
  });

  it('should fetch salesReps and set loading state to true', async () => {
    mock.onGet(`${API_BASE_URL}/users/`).reply(200, [
      {
        uuid: 'test_uuid1',
        first_name: 'test_firstName',
        last_name: 'test_last_name',
        phone_number: '0123456789',
        national_id: 'testNationalID',
        username: 'test_user1',
        date_joined: 'test_date',
      },
    ]);
    let fetcherResult;
    let result;
    await act(async () => {
      fetcherResult = renderHook(() => SalesRepsFetcher(), {
        wrapper,
      }).result;
    });
    await act(async () => {
      result = renderHook(() => TestHook(), {
        wrapper,
      }).result;
    });
    expect(fetcherResult.current.usersLoading).toBe(false);
    expect(result.current.state.users.length).toBe(1);
  });

  it('should adapt fetchedData to be presentable on table', async () => {
    const test_user_1 = {
      uuid: 'test_uuid1',
      first_name: 'fname',
      last_name: 'lname',
      phone_number: '0123456789',
      national_id: '201378375363737',
      username: 'test_user1',
      date_joined: Date.now().toString(),
    };
    let result;
    mock.onGet(`${API_BASE_URL}/users/`).reply(200, [test_user_1]);
    await act(async () => {
      renderHook(() => SalesRepsFetcher(), {
        wrapper,
      });
    });
    await act(async () => {
      result = renderHook(() => TestHook(), {
        wrapper,
      }).result;
    });

    expect(result.current.state.users.length).toBe(1);
    const testUser = result.current.state.users[0];
    expect(Array.isArray(testUser)).toBe(true);
    expect(testUser[0]).toBe(test_user_1.uuid);
    expect(testUser[1]).toBe(test_user_1.first_name);
    expect(testUser[2]).toBe(test_user_1.last_name);
    expect(testUser[4]).toBe(test_user_1.phone_number);
    expect(testUser[5]).toBe(test_user_1.national_id);
    expect(testUser[6]).toBe(test_user_1.username);
    expect(testUser[7]).toBe(test_user_1.date_joined);
  });

  it('should set error state to true', async () => {
    mock.onGet(`${API_BASE_URL}/users/`).networkError();
    await act(async () => {
      renderHook(() => SalesRepsFetcher(), {
        wrapper,
      });
    });
    const { result, _ } = renderHook(() => TestHook(), {
      wrapper,
    });
    expect(result.current.state.errorMessage).toBe(
      'حدث خطأ أثناء الاتصال بالخادم',
    );
  });

  it('should remove auth and user from local storage if unauthorized', async () => {
    mock.onGet(`${API_BASE_URL}/users/`).reply(401);

    const { _, waitForNextUpdate } = renderHook(() => SalesRepsFetcher(), {
      wrapper,
    });
    expect(localStorage.getItem('tokens')).toBe('testToken');
    expect(localStorage.getItem('users')).toBe('testUser');
    await waitForNextUpdate();
    expect(localStorage.getItem('tokens')).toBe(null);
    expect(localStorage.getItem('users')).toBe(null);
  });
});
