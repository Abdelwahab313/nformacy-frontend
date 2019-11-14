import React from 'react';
import { shallow } from 'enzyme';
import AddUserForm from '../../../components/user/addUserForm';
describe('add user form', () => {
  it('should render add user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#addUserForm').length).toEqual(1);
  });

  it('should render first name on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#firstName').length).toEqual(1);
  });

  it('should render last name on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#lastName').length).toEqual(1);
  });

  it('should render national id on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#nationalId').length).toEqual(1);
  });

  it('should render user name on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#userName').length).toEqual(1);
  });

  it('should render password on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('should render phone number on the user form', () => {
    const wrapper = shallow(<AddUserForm />);
    expect(wrapper.find('#phone_number').length).toEqual(1);
  });
});
