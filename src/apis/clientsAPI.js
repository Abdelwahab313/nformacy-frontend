import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchClients = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_clients`,
  }).then((response) => camelizeKeys(response));
};

export const fetchClientsDetails = (clientId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/${clientId}`,
  }).then((response) => camelizeKeys(response));
};

export const updateClient = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${user?.id}`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

