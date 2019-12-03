import React from 'react';
import { render } from '@testing-library/react';
import ProductForm from '../components/ProductForm';

describe('Product Form', () => {
  beforeEach(() => {
    return require('mutationobserver-shim');
  });
  it('should render add form with empty TextField if no props passed', () => {
    const onSubmit = jest.fn();
    let pageTitle = 'اضافه منتج جديد';
    const { asFragment } = render(
      <ProductForm pageTitle={pageTitle} onSubmit={onSubmit} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render add form with values if props passed', () => {
    const onSubmit = jest.fn();
    let pageTitle = 'اضافه منتج جديد';
    const { asFragment } = render(
      <ProductForm
        pageTitle={pageTitle}
        onSubmit={onSubmit}
        name={'test'}
        price={'123'}
        sku={'123'}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
