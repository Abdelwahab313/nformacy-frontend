import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../components/user/LoginUser';
describe('login user form', () => {
  it('should render login user form', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#loginUserForm').length).toEqual(1);
  });
  it('should render username field', () => {
    const wrapper = shallow(<Login />);
    const username_field = wrapper.find('#username');
    const username_props = username_field.props();
    expect(username_field.length).toEqual(1);
    expect(username_props.label).toEqual('اسم المستخدم او رقم الموبايل');
    expect(username_props.name).toEqual('username');
    expect(username_props.autoComplete).toEqual('username');
  });
  it('should render password field', () => {
    const wrapper = shallow(<Login />);
    const password_field = wrapper.find('#password');
    const password_props = password_field.props();
    expect(password_field.length).toEqual(1);
    expect(password_props.label).toEqual('كلمه المرور');
    expect(password_props.name).toEqual('password');
    expect(password_props.type).toEqual('password');
  });
  it('should render login button', () => {
    const wrapper = shallow(<Login />);
    const login_button = wrapper.find('#login');
    expect(login_button.length).toEqual(1);
  });
});