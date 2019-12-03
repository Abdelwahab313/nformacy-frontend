import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as AuthContextModule from '../../context/auth';
import { AuthContext } from '../../context/auth';
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

    fireEvent.change(getByTestId('productName'), {
      target: { value: productName },
    });
    fireEvent.change(getByTestId('sku'), { target: { value: sku } });
    fireEvent.change(getByTestId('price'), { target: { value: price } });
    fireEvent.submit(getByText('حفظ'));

    await new Promise((resolve) => setTimeout(resolve, 100));

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

    fireEvent.submit(getByText('حفظ'));
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
