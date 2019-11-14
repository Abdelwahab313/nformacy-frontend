import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import axiosMock from 'axios';
import UsersList from '../../../components/user/UsersList';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('axios');
describe('show all users', () => {
  it('make sure clients table exist', () => {
    const wrapper = shallow(<UsersList />);
    expect(wrapper.find('#usersList').length).toEqual(1);
  });
  it('renders users table details', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns.length).toEqual(5);
  });
  it('users table should have name column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'name', title: 'أسم المستخدم' }),
    );
  });
  it('users table should have phone number column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'phone_number', title: 'رقم الموبايل' }),
    );
  });
  it('users table should have national id column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'national_id', title: 'رقم البطاقه' }),
    );
  });
  it('users table should have username column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'username', title: 'اسم تسجيل الدخول' }),
    );
  });
  it('users table should have date created column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'created', title: 'تاريخ الاضافه' }),
    );
  });
  it('users table should have title column', () => {
    const wrapper = shallow(<UsersList />);
    const listColumns = wrapper.find('#usersList').props().title;
    expect(listColumns).toEqual('المستخدمين');
  });
  it.skip('users table should have rendered data', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [
        {
          national_id: '2134567981324',
          phone_number: '01067748234',
          username: 'test user',
          first_name: 'first test',
          last_name: 'last test',
        },
      ],
    });

    const { result } = renderHook(() => UsersList());
    act(() => {
      console.log(result.current.users);
    });
  });
});
