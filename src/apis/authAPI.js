import axios from 'axios';
import { API_BASE_URL } from '../settings';

const login = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/login`,
    data: { ...user, app_type: 'dashboard' },
  });
};

const logout = (tokenStr) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/logout`,
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { login, logout };
