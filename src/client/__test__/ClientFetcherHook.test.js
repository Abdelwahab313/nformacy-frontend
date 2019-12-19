import * as AuthenticationModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { API_BASE_URL } from '../../settings';
import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import ClientsFetcher from '../hooks/ClientsFetcher';
import LocalStorageMock from '../../__test__/localStorage';
import { SET_ERROR_MESSAGE, UPDATE_CLIENTS } from '../context/actionTypes';
import * as ClientsContextModule from '../context';
import { useClientState } from '../context';

let mockedState = undefined;
const mockedDispatch = (action) => {
  switch (action.type) {
    case UPDATE_CLIENTS:
      mockedState.clients = action.payload;
      break;
    case SET_ERROR_MESSAGE:
      mockedState.errorMessage = action.payload;
      break;
    default:
      break;
  }
};
const useClientsMock = () => {
  return [mockedState, mockedDispatch];
};
const TestHook = () => {
  const [state, dispatch] = useClientState();
  return { state, dispatch };
};
const mock = new MockAdapter(axios);
describe('Client Fetcher Hook', () => {
  let wrapper;
  beforeEach(() => {
    const testToken = 'testToken';
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', testToken);
    global.localStorage.setItem('users', 'testUser');
    jest.spyOn(AuthenticationModule, 'useAuth').mockImplementation(() => ({
      authTokens: testToken,
      setAuthTokens: () => {},
    }));
    jest
      .spyOn(ClientsContextModule, 'useClientState')
      .mockImplementation(useClientsMock);
    wrapper = ({ children }) => (
      <AuthContext.Provider>{children}</AuthContext.Provider>
    );
    mockedState = { clients: [] };
  });
  it('should retrieve clients', async () => {
    mock.onGet(`${API_BASE_URL}/clients/`).reply(200, [
      {
        uuid: 'test_uuid',
        name: 'test_name',
        ownerName: 'test_owner_name',
        address: 'test_address',
        image_link: 'test_image_link',
        verified: true,
        location: { coordinates: [200, 200] },
        contacts: [{ phone_number: '0123456789' }],
        created: 'test_date',
      },
    ]);

    let fetcher, testHook;
    await act(async () => {
      fetcher = renderHook(() => ClientsFetcher(), {
        wrapper,
      });
    });
    await act(async () => {
      testHook = renderHook(() => TestHook(), {
        wrapper,
      }).result;
    });
    expect(testHook.current.state.clients.length).toBe(1);
    expect(testHook.current.state.clients[0]).toEqual([
      'test_uuid',
      'test_name',
      'test_owner_name',
      'test_address',
      'test_image_link',
      '0123456789',
      true,
      'test_date',
    ]);
  });
  it('should set loading to false', async () => {
    mock.onGet(`${API_BASE_URL}/clients/`).reply(200, [
      {
        name: 'string',
        ownerName: 'string',
        address: 'string',
        image_link: 'string',
        verified: true,
        location: { coordinates: [200, 200] },
        contacts: [{ phone_number: '0123456789' }],
      },
    ]);

    let fetcher;
    act(() => {
      fetcher = renderHook(() => ClientsFetcher(), {
        wrapper,
      });
    });
    expect(fetcher.result.current.clientsLoading).toBe(true);
    await fetcher.waitForNextUpdate();
    expect(fetcher.result.current.clientsLoading).toBe(false);
  });
  it('should show error in case of NetworkError', async () => {
    mock.onGet(`${API_BASE_URL}/clients/`).networkError();
    let fetcher, testHook;
    act(() => {
      fetcher = renderHook(() => ClientsFetcher(), {
        wrapper,
      });
    });
    await act(async () => {
      testHook = renderHook(() => TestHook(), {
        wrapper,
      }).result;
    });
    expect(testHook.current.state.errorMessage).toBe(
      'حدث خطأ أثناء الاتصال بالخادم',
    );
  });
  it('should remove localstorage items in case of unauthorized request', async () => {
    mock.onGet(`${API_BASE_URL}/clients/`).reply(401);
    let fetcher;
    await act(async () => {
      fetcher = renderHook(() => ClientsFetcher(), {
        wrapper,
      });
    });
    const loadedToken = global.localStorage.getItem('tokens');
    const loadedUser = global.localStorage.getItem('users');
    expect(loadedToken).toBe(null);
    expect(loadedUser).toBe(null);
  });
});
