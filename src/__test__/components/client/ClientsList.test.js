import React from 'react';
import { shallow, mount } from 'enzyme';
import ClientsList from '../../../components/client/ClientsList';

const clients = [
  {
    name: 'ahmed',
    address: 'address 1',
  },
  {
    name: 'ahmed',
    address: 'address 2',
  },
  {
    name: 'ahmed',
    address: 'address 3',
  },
  {
    name: 'ahmed',
    address: 'address 4',
  },
];

describe('show all clients', () => {
  it('make sure clients table exist', () => {
    const wrapper = shallow(<ClientsList clients={clients} />);
    expect(wrapper.find('Table').length).toEqual(1);
  });
  it('renders clients table', () => {
    const wrapper = mount(<ClientsList clients={clients} />);
    expect(wrapper.find('#row-1').length).toEqual(1);
  });

  it('renders clients table details', () => {
    const wrapper = mount(<ClientsList clients={clients} />);
    expect(wrapper.find('tr').length).toEqual(5);
  });
});
