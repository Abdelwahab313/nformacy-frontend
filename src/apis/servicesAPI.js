import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const fetchServices = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/all`,
  }).then((response) => camelizeKeys(response));
};
