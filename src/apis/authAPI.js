import axios from 'axios';
import { API_BASE_URL } from '../settings';

const login = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/login`,
    data: { ...user },
  });
};

const logout = () => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/logout`,
  });
};

export { login, logout };
