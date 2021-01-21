import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const addAdmin = (user) => {
  return axios({
    method: 'post',
    data: user,
    url: `${API_BASE_URL}/users/create_admin`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAdmins = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_admins`,
  }).then((response) => camelizeKeys(response));
};
