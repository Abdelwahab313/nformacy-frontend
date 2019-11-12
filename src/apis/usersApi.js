import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = () => {
  return axios.get(`${API_BASE_URL}/users/`);
};

export { fetchUsers };
