import * as AuthContextMoudle from '../../context/auth';
import { AuthContext } from '../../context/auth';
import React from 'react';
import ProductsPage from '../ProductsPage';
import { ProductProvider } from '../context/context';
import { render } from '@testing-library/react';
import ProductFetcher from '../hooks/ProductFetcher';
jest.mock('../hooks/ProductFetcher');
describe('ProductFetcher Presentation', () => {
  it('should render products list screen correctly', () => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: { access_token: 'testToken' },
    }));
    ProductFetcher.mockImplementationOnce(() => [false, 'setter']);
    const products = [
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
