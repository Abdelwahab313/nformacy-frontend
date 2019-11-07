import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import Client from '../../../components/client/detail/Client';

describe('test app routes', () => {
  it.skip('should redirect to client details page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/clients/1']}>
        <Route path={'clients/:id'} component={Client} />
      </MemoryRouter>,
    );
    expect(wrapper.find(Client)).toBe('clients');
  });
});
