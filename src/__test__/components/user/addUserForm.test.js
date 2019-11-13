import React from 'react';
import { shallow } from 'enzyme';
import AddUserForm from '../../../components/user/addUserForm';
describe('add user form', () => {
  it('should render add user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#addUserForm').length).toEqual(1);
  });
});
