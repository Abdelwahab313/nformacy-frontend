import React from 'react';
import { mount } from 'enzyme';
import Client from '../../../components/client/detail/Client';
import { clients } from '../../../data';
import { MemoryRouter } from 'react-router';

describe.skip('Client', () => {
  it('should show client details', () => {});
  it('should show clients images', () => {
    const wrapper = mount(<Client client={clients} />);
    expect(wrapper.find('#clientImages').length).toEqual(1);
  });
  it('should show client visits', () => {
    const wrapper = mount(<Client client={clients} />);
    expect(wrapper.find('#clientVisits').length).toEqual(1);
  });
  it('should show client map', () => {
    const wrapper = mount(<Client client={clients} />);
    expect(wrapper.find('#clientMap').length).toEqual(1);
  });
});
