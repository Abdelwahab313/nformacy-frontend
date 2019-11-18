import React from 'react';
import { shallow } from 'enzyme';
import ProductsList from '../../../components/product/ProductsList';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';

describe('Products', () => {
  let tree;
  let wrapper;
  beforeEach(() => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    tree = (
      <AuthContext.Provider>
        <ProductsList />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree).dive();
  });
  it('should render products details', () => {
    wrapper = shallow(<ProductsList />);
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render product list column numbers', () => {
    wrapper = shallow(<ProductsList />);
    const productColumns = wrapper.find('#productsList').props().columns;
    expect(productColumns.length).toEqual(3);
  });
  it('should render table product name column', () => {
    wrapper = shallow(<ProductsList />);
    const productColumns = wrapper.find('#productsList').props().columns;
    expect(productColumns).toContainEqual(
      expect.objectContaining({ field: 'name', title: 'اسم المنتج' }),
    );
  });
  it('should render table SKU column', () => {
    wrapper = shallow(<ProductsList />);
    const productColumns = wrapper.find('#productsList').props().columns;
    expect(productColumns).toContainEqual(
      expect.objectContaining({ field: 'sku', title: 'SKU' }),
    );
  });
  it('should render table product price column', () => {
    wrapper = shallow(<ProductsList />);
    const productColumns = wrapper.find('#productsList').props().columns;
    expect(productColumns).toContainEqual(
      expect.objectContaining({ field: 'price', title: 'سعر المنتج' }),
    );
  });
  it('should render add product button', () => {
    wrapper = shallow(<ProductsList />);
    const productColumns = wrapper.find('#add-product-button');
    expect(productColumns.length).toEqual(1);
  });
});
