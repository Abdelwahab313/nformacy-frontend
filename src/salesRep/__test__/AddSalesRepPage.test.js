import { API_BASE_URL } from '../../settings';
import * as AuthContextModule from '../../auth/auth';
import { AuthContext } from '../../auth/auth';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import AddSalesRepForm from '../AddSalesRepForm';
import { SalesRepProvider } from '../context';

describe('Add SalesRep Form', () => {
  let mock;
  let spy;
  beforeEach(() => {
    require('mutationobserver-shim');
    jest.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    mock = new MockAdapter(axios);
    spy = jest.spyOn(axios, 'post');
  });

  afterEach(() => {
    spy.mockClear();
    mock.restore();
  });

  it('should add salesRep if data is valid', async () => {
    mock.onPost(`${API_BASE_URL}/users`).reply(201);
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <SalesRepProvider>
          <AddSalesRepForm />
        </SalesRepProvider>
      </AuthContext.Provider>,
    );
    const first_name = 'test_f_name';
    const last_name = 'test_l_name';
    const password = 'test_password';
    const national_id = '21346284618362';
    const username = 'test_username';
    const phone_number = '01038874626';
    await act(async () => {
      fireEvent.change(getByTestId('first_name'), {
        target: { value: first_name },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('last_name'), {
        target: { value: last_name },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('password'), {
        target: { value: password },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('confirm-password'), {
        target: { value: password },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('national_id'), {
        target: { value: national_id },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId('username'), {
        target: { value: username },
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
  });

  it('should not submit salesRep if data is invalid', async () => {
    mock.onPost(`${API_BASE_URL}/users/`).reply(201);
    const { getByText } = render(
      <AuthContext.Provider>
        <SalesRepProvider>
          <AddSalesRepForm />
        </SalesRepProvider>
      </AuthContext.Provider>,
    );

    await act(async () => {
      fireEvent.submit(getByText('حفظ'));
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
