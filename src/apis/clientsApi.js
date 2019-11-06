import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchClient = (client_id) => {
  return axios.get(`${API_BASE_URL}/clients/${client_id}`);
};

const fetchClients = () => {
  return axios.get(`${API_BASE_URL}/clients/`);
};

export { fetchClients, fetchClient };
