import { API_BASE_URL } from '../../settings';
import { fireEvent, render } from '@testing-library/react';
import { AuthContext } from '../../context/auth';
import { ProductProvider } from '../context/context';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as AuthContextModule from '../../context/auth';
import EditProductPage from '../EditProductPage';

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
    fireEvent.change(getByTestId('productName'), {
      target: { value: productName },
    });
    fireEvent.change(getByTestId('price'), {
      target: { value: price },
    });
    fireEvent.submit(getByText('حفظ'));

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${API_BASE_URL}/products/testUUID`,
      { name: 'test2', price: '42', sku: 'testSKU' },
      { headers: { Authorization: 'Bearer undefined' } },
    );
  });
});
