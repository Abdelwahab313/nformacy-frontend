import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/users/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};
const postUser = (user, tokenStr) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/`,
    data: user,
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { fetchUsers, postUser };
