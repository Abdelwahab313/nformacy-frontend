import { API_BASE_URL } from '../../settings';
import { act, fireEvent, render } from '@testing-library/react';
import * as AuthContextModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import { ProductProvider } from '../context/context';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import EditProductPage from '../EditProductPage';
import LocalStorageMock from '../../__test__/localStorage';

describe('Edit Product form', () => {
  let spy;
  beforeEach(() => {
    require('mutationobserver-shim');
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    spy = jest.spyOn(axios, 'patch');
  });
  it('should edit product if data is valid', async () => {
    const mock = new MockAdapter(axios);
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('tokens', 'testToken');
    global.localStorage.setItem('users', 'testUser');
    mock.onPatch(`${API_BASE_URL}/products/testUUID`).reply(200, {
      uuid: 'testUUID',
      name: 'testName',
      sku: 'testSKU',
      price: 40,
    });
    const toBeEdited = ['testUUID', 'testName', 'testSKU', 30];
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <ProductProvider>
          <EditProductPage product={toBeEdited} />
        </ProductProvider>
      </AuthContext.Provider>,
    );
    const productName = 'test2';
    const price = 42;
    await act(async () => {
      fireEvent.change(getByTestId('productName'), {
        target: { value: productName },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('price'), {
        target: { value: price },
      });
    });
    await act(async () => {
      fireEvent.submit(getByText('حفظ'));
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${API_BASE_URL}/products/testUUID`,
      { name: 'test2', price: '42', sku: 'testSKU' },
      { headers: { Authorization: 'Bearer undefined' } },
    );
  });
});
