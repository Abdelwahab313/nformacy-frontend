import React from 'react';
import { shallow } from 'enzyme';
import { clients } from '../../../data';
import ClientDetails from '../../../components/client/detail/ClientDetail';

describe('Client Details', () => {
  const currentClient = clients[0];
  beforeEach(() => {
    currentClient.contacts = ['٠١١٣٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'];
  });
  it('should show table title', () => {
    const wrapper = shallow(<ClientDetails passedClient={currentClient} />);
    expect(wrapper.find('#title').length).toEqual(1);
  });
  it('should show table content', () => {
    const wrapper = shallow(<ClientDetails passedClient={currentClient} />);
    expect(wrapper.find('#clientName').length).toEqual(1);
    expect(wrapper.find('#ownerName').length).toEqual(1);
    expect(wrapper.find('#address').length).toEqual(1);
    expect(wrapper.find('#phones').length).toEqual(1);
  });
});