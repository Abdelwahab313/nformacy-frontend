import React from 'react';
import { mount, shallow } from 'enzyme';
import ClientsList from '../../../components/client/ClientsList';
import { clients } from '../../../data';

describe.skip('show all clients', () => {
  it('make sure clients table exist', () => {
    const wrapper = shallow(<ClientsList clients={clients} />);
    expect(wrapper.find('Table').length).toEqual(1);
  });
  it.skip('renders clients table details', () => {
    const wrapper = mount(<ClientsList clients={clients} />);
    expect(wrapper.find('tr').length).toEqual(4);
  });
});
