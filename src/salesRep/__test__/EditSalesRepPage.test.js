import * as AuthContextModule from '../../auth/auth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_BASE_URL } from '../../settings';
import React from 'react';
import { SalesRepProvider } from '../context';
import EditSalesRepForm from '../EditSalesRepForm';
import { act, fireEvent, render } from '@testing-library/react';

describe('Edit salesRep', () => {
  let spy;
  beforeEach(() => {
    require('mutationobserver-shim');
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    spy = jest.spyOn(axios, 'patch');
  });

  it('should edit product if data is valid', async () => {
    const mock = new MockAdapter(axios);
    mock.onPatch(`${API_BASE_URL}/users/testUUID`).reply(200, {
      uuid: 'testUUID',
      first_name: 'test_f_Name2',
      last_name: 'test_l_Name',
      phone_number: '01058842478',
      national_id: '21348292019321',
      username: 'test_user',
    });
    const toBeEdited = [
      'testUUID',
      'test_f_name',
      'test_l_name',
      '_',
      '01058842478',
      '21348292019321',
      'test_user',
    ];

    const { getByText, getByTestId } = render(
      <SalesRepProvider>
        <EditSalesRepForm salesRep={toBeEdited} />
      </SalesRepProvider>,
    );
    const fname = 'test_f_Name2';
    const phone_number = '01058842478';
    await act(async () => {
      fireEvent.change(getByTestId('first_name'), {
        target: { value: fname },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('phone_number'), {
        target: { value: phone_number },
      });
    });
    await act(async () => {
      fireEvent.submit(getByText('حفظ'));
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      `${API_BASE_URL}/users/testUUID`,
      {
        first_name: 'test_f_Name2',
        last_name: 'test_l_name',
        national_id: '21348292019321',
        phone_number: '01058842478',
        username: 'test_user',
      },
      { headers: { Authorization: 'Bearer undefined' } },
    );
  });
});
