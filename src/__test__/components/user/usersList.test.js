import React from 'react';
import { mount, shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import axiosMock from 'axios';
import UsersList from '../../../components/user/UsersList';
import { renderHook, act } from '@testing-library/react-hooks';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';
import AddUserForm from '../../../components/user/addUserForm';

jest.mock('axios');
describe('show all users', () => {
  let tree;
  let wrapper;
  beforeEach(() => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    tree = (
      <AuthContext.Provider>
        <UsersList />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree).dive();
  });

  it('make sure clients table exist', () => {
    expect(wrapper.find('#usersList').length).toEqual(1);
  });

  it('renders users table details', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns.length).toEqual(5);
  });

  it('users table should have name column', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'name', title: 'أسم المستخدم' }),
    );
  });

  it('users table should have phone number column', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'phone_number', title: 'رقم الموبايل' }),
    );
  });

  it('users table should have national id column', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'national_id', title: 'رقم البطاقه' }),
    );
  });

  it('users table should have username column', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'username', title: 'اسم تسجيل الدخول' }),
    );
  });

  it('users table should have date created column', () => {
    const listColumns = wrapper.find('#usersList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'created', title: 'تاريخ الاضافه' }),
    );
  });

  it('users table should have title column', () => {
    const listColumns = wrapper.find('#usersList').props().title;
    expect(listColumns).toEqual('المستخدمين');
  });

  it('should have add user button', () => {
    const found = wrapper.find('#add-user-button').length;
    expect(found).toEqual(1);
  });

  it('should render dialog modal', () => {
    const found = wrapper.find('#add-user-dialog').length;
    expect(found).toEqual(1);
  });

  it('should have an action that reroutes to sales rep details screen', () => {
    const found = wrapper.find('#details');
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
  });
});
