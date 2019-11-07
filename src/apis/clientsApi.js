import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchClient = (client_id) => {
  return axios.get(`${API_BASE_URL}/clients/${client_id}`);
};

const fetchClients = () => {
  return axios.get(`${API_BASE_URL}/clients/`);
};

const verifyClient = (client_id) => {
  return axios.patch(`${API_BASE_URL}/clients/${client_id}/verify_client`);
};

const deleteClient = (client_id) => {
  return axios.delete(`${API_BASE_URL}/clients/${client_id}`);
};

export { fetchClients, fetchClient, verifyClient, deleteClient };
