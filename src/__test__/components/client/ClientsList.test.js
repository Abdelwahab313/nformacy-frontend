import React from 'react';
import { shallow } from 'enzyme';
import ClientsList from '../../../components/client/ClientsList';

describe('show all clients', () => {
  it('make sure clients table exist', () => {
    const wrapper = shallow(<ClientsList />);
    expect(wrapper.find('#clientsList').length).toEqual(1);
  });
  it('renders clients table details', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns.length).toEqual(6);
  });
  it('rendered clients table with 2 actions', () => {
    const wrapper = shallow(<ClientsList />);
    const listActions = wrapper.find('#clientsList').props().actions;
    expect(listActions.length).toEqual(2);
  });
  it('client table should have name column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'name', title: 'أسم المكان' }),
    );
  });
  it('client table should have owner name column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'ownerName', title: 'أسم المدير' }),
    );
  });
  it('client table should have owner phone numbers column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'contacts', title: 'رقم الهاتف' }),
    );
  });
  it('client table should have address column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'address', title: 'العنوان' }),
    );
  });
  it('client table should have verified column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'verified', title: 'الحاله' }),
    );
  });
  it('client table should have date created column', () => {
    const wrapper = shallow(<ClientsList />);
    const listColumns = wrapper.find('#clientsList').props().columns;
    expect(listColumns).toContainEqual(
      expect.objectContaining({ field: 'created', title: 'تاريخ الاضافه' }),
    );
  });
  it.skip('clients page should show map', () => {
    const wrapper = shallow(<ClientsList />);
    expect(wrapper.find('#mapContainer').length).toEqual(1);
  });
});
