import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = () => {
  return axios.get(`${API_BASE_URL}/users/`);
};
const postUser = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/`,
    data: user,
  });
};

export { fetchUsers, postUser };
