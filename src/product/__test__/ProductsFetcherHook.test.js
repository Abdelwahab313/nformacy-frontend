import React from 'react';
import * as AuthContextMoudle from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks';
import { API_BASE_URL } from '../../settings';
import LocalStorageMock from '../../__test__/localStorage';
import * as ProductContextModule from '../context/context';
import { ProductProvider, useProductState } from '../context/context';
import { SET_ERROR, UPDATE_PRODUCTS } from '../context/contextActions';
import ProductFetcher from '../hooks/ProductFetcher';

const mockedState = { products: [], errorMessage: '', productsLoading: false };
const mockedDispatch = (action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      mockedState.products = action.payload;
      break;
    case SET_ERROR:
      mockedState.errorMessage = action.payload;
      break;
    default:
      break;
  }
};
const useProductMock = () => {
  return [mockedState, mockedDispatch];
};
const TestComponent = () => {
  const [state, dispatch] = useProductState();
  return { state, dispatch };
};

const mock = new MockAdapter(axios);
describe('ProductFetcher hook', () => {
  let wrapper;
  beforeEach(() => {
    const testToken = 'testToken';
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', testToken);
    global.localStorage.setItem('users', 'testUser');
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: testToken,
      setAuthTokens: () => {},
    }));
    jest
      .spyOn(ProductContextModule, 'useProductState')
      .mockImplementation(useProductMock);
    wrapper = ({ children }) => (
      <AuthContext.Provider>
        <ProductProvider>{children}</ProductProvider>
      </AuthContext.Provider>
    );
  });
  it('should fetch products and set loading state', async () => {
    mock.onGet(`${API_BASE_URL}/products/`).reply(200, [
      {
        uuid: 'test_uuid1',
        name: 'test_product1',
        sku: '1',
        price: 50,
      },
      {
        uuid: 'test_uuid2',
        name: 'test_product2',
        sku: '2',
        price: 60,
      },
    ]);
    let fetcher, result;
    await act(async () => {
      fetcher = renderHook(() => ProductFetcher(), {
        wrapper,
      });
    });
    await act(async () => {
      result = renderHook(() => TestComponent(), {
        wrapper,
      }).result;
    });
    expect(fetcher.result.current.productsLoading).toBe(false);
    expect(result.current.state.products.length).toBe(2);
  });

  it('should adapt products data for presentation', async () => {
    mock.onGet(`${API_BASE_URL}/products/`).reply(200, [
      {
        uuid: 'test_uuid1',
        name: 'test_product1',
        sku: '1',
        price: 50,
      },
      {
        uuid: 'test_uuid2',
        name: 'test_product2',
        sku: '2',
        price: 60,
      },
    ]);
    await act(async () => {
      renderHook(() => ProductFetcher(), {
        wrapper,
      });
    });
    let result;
    await act(async () => {
      result = renderHook(() => TestComponent(), {
        wrapper,
      }).result;
    });
    const adaptedResult = [
      ['test_uuid1', 'test_product1', '1', 50],
      ['test_uuid2', 'test_product2', '2', 60],
    ];
    expect(result.current.state.products).toEqual(adaptedResult);
  });

  it('should set error flag true if no connection', async () => {
    mock.onGet(`${API_BASE_URL}/products/`).networkError();
    await act(async () => {
      renderHook(() => ProductFetcher(), {
        wrapper,
      });
    });
    let testComponent;
    await act(async () => {
      testComponent = renderHook(() => TestComponent(), {
        wrapper,
      });
    });
    expect(testComponent.result.current.state.errorMessage).toBe(
      'حدث خطأ أثناء الاتصال بالخادم',
    );
  });

  it('should remove AuthToken and user if unauthorized', async () => {
    mock.onGet(`${API_BASE_URL}/products/`).reply(function(config) {
      return [401];
    });
    await act(async () => {
      renderHook(() => ProductFetcher(), {
        wrapper,
      });
    });

    const loadedToken = global.localStorage.getItem('tokens');
    const loadedUser = global.localStorage.getItem('users');

    expect(loadedToken).toBe(null);
    expect(loadedUser).toBe(null);
  });
});
