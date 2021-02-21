import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const login = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/login`,
    data: { ...user },
  }).then((response) => camelizeKeys(response));
};

const forgetPassword = (email) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/forget_password`,
    data: { email },
  }).then((response) => camelizeKeys(response.data));
};

const resetPassword = (token, password) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/auth/reset_password`,
    data: { token, password },
  }).then((response) => camelizeKeys(response.data));
};

const changePassword = (currentPassword, newPassword) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/auth/change_password`,
    data: decamelizeKeys({ currentPassword, newPassword }),
  }).then((response) => camelizeKeys(response.data));
};

const logout = () => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/logout`,
  });
};

export { login, logout, forgetPassword, resetPassword, changePassword };
