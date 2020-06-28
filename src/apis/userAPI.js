import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const signup = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users`,
    data: decamelizeKeys({ ...user }),
  });
};

const updateProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/1`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

export { signup, updateProfile };
