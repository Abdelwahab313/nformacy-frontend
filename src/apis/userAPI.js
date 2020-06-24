import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

const signup = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users`,
    data: { ...user },
  });
};

const updateProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/3`,
    data: { ...user },
  }).then((response) => camelizeKeys(response));
};

export { signup, updateProfile };
