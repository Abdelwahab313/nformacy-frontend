import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

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