import React from 'react';
import { shallow } from 'enzyme';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';
import AddProductForm from '../../../components/product/AddProductForm';

describe('Add Product form', () => {
  let tree;
  let wrapper;
  beforeEach(() => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    tree = (
      <AuthContext.Provider>
        <AddProductForm />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree)
      .dive()
      .dive();
  });
  it('should render add product form', () => {
    expect(wrapper.find('#addProductForm').length).toEqual(1);
  });
  it('should render product name input type', () => {
    expect(wrapper.find('#productName').length).toEqual(1);
  });
  it('should render SKU input type', () => {
    expect(wrapper.find('#sku').length).toEqual(1);
  });
  it('should render price input type', () => {
    expect(wrapper.find('#price').length).toEqual(1);
  });

  // it('should render first name on the user form', () => {
  //   expect(wrapper.find('#firstName').length).toEqual(1);
  // });
  //
  // it('should render last name on the user form', () => {
  //   expect(wrapper.find('#lastName').length).toEqual(1);
  // });
  //
  // it('should render national id on the user form', () => {
  //   expect(wrapper.find('#nationalId').length).toEqual(1);
  // });
  //
  // it('should render user name on the user form', () => {
  //   expect(wrapper.find('#userName').length).toEqual(1);
  // });
  //
  // it('should render password on the user form', () => {
  //   expect(wrapper.find('#password').length).toEqual(1);
  // });
  //
  // it('should render phone number on the user form', () => {
  //   expect(wrapper.find('#phone_number').length).toEqual(1);
  // });
});
