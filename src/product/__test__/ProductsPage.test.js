import * as AuthContextModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import React from 'react';
import ProductsPage from '../ProductsPage';
import { ProductProvider } from '../context/context';
import { render } from '@testing-library/react';
import ProductFetcher from '../hooks/ProductFetcher';
import { convertObjToArray } from '../utils';

jest.mock('../hooks/ProductFetcher');
describe('ProductFetcher Presentation', () => {
  xit('should render products list screen correctly', () => {
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
    }));
    ProductFetcher.mockImplementationOnce(() => [false, 'setter']);
    const test_product_1 = {
      uuid: 'test_uuid1',
      name: 'test_product1',
      sku: '1',
      price: 50,
    };
    const test_product_2 = {
      uuid: 'test_uuid2',
      name: 'test_product2',
      sku: '2',
      price: 60,
    };
    const products = [
      convertObjToArray(test_product_1),
      convertObjToArray(test_product_2),
    ];
    const { asFragment } = render(
      <AuthContext.Provider>
        <ProductProvider initialValue={{ products: products }}>
          <ProductsPage />
        </ProductProvider>
      </AuthContext.Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
