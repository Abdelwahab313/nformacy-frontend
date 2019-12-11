import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import * as AuthContextModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import AddProductPage from '../AddProductPage';
import { ProductProvider } from '../context/context';
import { API_BASE_URL } from '../../settings';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Add Product form', () => {
  let mock;
  let spy;
  beforeEach(() => {
    require('mutationobserver-shim');
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    mock = new MockAdapter(axios);
    spy = jest.spyOn(axios, 'post');
  });
  afterEach(() => {
    spy.mockClear();
    mock.restore();
  });
  it('should submit product if data is valid', async () => {
    mock.onPost(`${API_BASE_URL}/products`).reply(201);
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <ProductProvider>
          <AddProductPage />
        </ProductProvider>
      </AuthContext.Provider>,
    );
    const productName = 'test';
    const sku = 'test';
    const price = 123;
    await act(async () => {
      fireEvent.change(getByTestId('productName'), {
        target: { value: productName },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('sku'), { target: { value: sku } });
    });
    await act(async () => {
      fireEvent.change(getByTestId('price'), { target: { value: price } });
    });
    await act(async () => {
      fireEvent.submit(getByText('حفظ'));
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${API_BASE_URL}/products/`,
      { name: productName, price: '123', sku: 'test' },
      { headers: { Authorization: 'Bearer undefined' } },
    );
  });
  it('should not submit product if data is invalid', async () => {
    mock.onPost(`${API_BASE_URL}/products/`).reply(201);
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <ProductProvider>
          <AddProductPage />
        </ProductProvider>
      </AuthContext.Provider>,
    );

    await act(async () => {
      fireEvent.submit(getByText('حفظ'));
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
