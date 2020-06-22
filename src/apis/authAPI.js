import axios from 'axios';
import { API_BASE_URL } from '../settings';

const login = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/user/login`,
    data: { ...user },
  });
};

const logout = (tokenStr) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/user/login`,
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { login, logout };
