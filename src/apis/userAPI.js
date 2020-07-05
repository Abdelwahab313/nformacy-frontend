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

const updateProfile = (user, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const updateProfilePicture = (user, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: user,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

const uploadCV = (cv, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: cv,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};
export { signup, updateProfile, updateProfilePicture, uploadCV };
