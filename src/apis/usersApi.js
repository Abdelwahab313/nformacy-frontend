import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = () => {
  return axios.get(`${API_BASE_URL}/users/`);
};
const fetchUser = (user_id) => {
  return axios.get(`${API_BASE_URL}/users/${user_id}`);
};

export { fetchUsers, fetchUser };
