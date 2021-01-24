import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const addAdvisor = (user) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ ...user }),
    url: `${API_BASE_URL}/users/create_advisor`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAdvisors = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_advisers`,
  }).then((response) => camelizeKeys(response));
};
