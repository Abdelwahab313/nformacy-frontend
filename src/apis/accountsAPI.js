import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const addAccount = (user) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ ...user }),
    url: `${API_BASE_URL}/users/create_account`,
  }).then((response) => camelizeKeys(response));
};
export const fetchAccounts = (corporateId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_accounts`,
    params: decamelizeKeys({ corporateId }),
  }).then((response) => camelizeKeys(response));
};