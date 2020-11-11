import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchServices = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/all`,
  }).then((response) => camelizeKeys(response));
};

export const submitService = (service) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/`,
    data: decamelizeKeys({ ...service }),
  }).then((response) => camelizeKeys(response));
};