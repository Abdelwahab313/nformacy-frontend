import React from 'react';
import { shallow } from 'enzyme';
import ClientsList from '../../../components/client/ClientsList';
import * as AuthContextMoudle from '../../../auth/auth';
import { AuthContext } from '../../../auth/auth';

describe('show all clients', () => {
  let tree;
  let wrapper;
  beforeEach(() => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    tree = (
      <AuthContext.Provider>
        <ClientsList />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree).dive();
  });
  it('make sure clients table exist', () => {
    expect(wrapper.find('#clientsList').length).toEqual(1);
  });
  it('renders clients table details', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns.length).toEqual(6);
  });
  it('rendered clients table with 1 actions', () => {
    const listActions = wrapper.find('#clientsList').props().actions;
    expect(listActions.length).toEqual(1);
  });
  it('client table should have name column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'name', title: 'أسم المكان' }),
    );
  });
  it('client table should have owner name column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'ownerName', title: 'أسم المدير' }),
    );
  });
  it('client table should have owner phone numbers column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'contacts', title: 'رقم الهاتف' }),
    );
  });
  it('client table should have address column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'address', title: 'العنوان' }),
    );
  });
  it('client table should have verified column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'verified', title: 'الحاله' }),
    );
  });
  it('client table should have date created column', () => {
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'created', title: 'تاريخ الاضافه' }),
    );
  });
  it.skip('clients page should show map', () => {
    expect(wrapper.find('#mapContainer').length).toEqual(1);
  });
});
