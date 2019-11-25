import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import ClientDetailsScreen from '../../../components/client/detail/ClientDetailsScreen';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';
import axios from 'axios';
import App from '../../../components/App';
import ClientDetails from '../../../components/client/detail/ClientDetail';

jest.mock('axios');
axios.mockResolvedValue();
describe('test app routes', () => {
  it.skip('should redirect to client details page', () => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        response: {
          data: {
            location: {
              coordinates: [1, 2],
            },
          },
        },
      }),
    );

    const tree = (
      <AuthContext.Provider>
        <App />
      </AuthContext.Provider>
    );
    const wrapper = mount(
      <MemoryRouter initialEntries={['/clients/1']}>{tree}</MemoryRouter>,
    );
    expect(wrapper.find(ClientDetailsScreen)).toHaveLength(1);
  });
});
