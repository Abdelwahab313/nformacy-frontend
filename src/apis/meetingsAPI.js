import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchAllMeetings = () => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings`,
  });
};

const logout = (tokenStr) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/auth/logout`,
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { fetchAllMeetings, logout };
