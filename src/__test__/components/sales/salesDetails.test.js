import React from 'react';
import axios from 'axios';
import * as AuthContextModule from '../../../auth/auth';
import { AuthContext } from '../../../auth/auth';
import SaleDetails from '../../../components/sales/SaleDetails';
import { act, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { API_BASE_URL } from '../../../settings';

const mock = new MockAdapter(axios);
describe('SaleDetails', () => {
  it('should match snapshot', async () => {
    mock.onGet(`${API_BASE_URL}/sales/`).reply(200, [
      {
        uuid: '3a5384ec-cc72-4d28-a4f1-c91690ece7c0',
        created_location: {
          coordinates: [29.9680439, 31.4786565],
          type: 'Point',
        },
        saved_location: {
          coordinates: [29.9680439, 31.4786565],
          type: 'Point',
        },
        to: '082b4d7d-be6f-4c0b-b62a-bc54da17912f',
        by: '6f7d5ad1-36b3-489f-b43c-e1e698c623ab',
        products: [
          {
            uuid: '03a04ed0-eeb9-4000-ad18-f0159e175a83',
            price: 'L.E.30.00',
            quantity: 2,
          },
        ],
        total_price: 'L.E.60.00',
        created: '2019-11-27T07:59:14.341108Z',
      },
    ]);
    const reactRouter = require('react-router');
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    jest.spyOn(reactRouter, 'useParams').mockImplementation(() => ({
      uuid: 'test-uuid',
    }));
    let asFragment;
    await act(async () => {
      const tree = (
        <AuthContext.Provider>
          <SaleDetails />
        </AuthContext.Provider>
      );
      asFragment = await render(tree).asFragment();
    });
    expect(asFragment).toMatchSnapshot();
  });
});
