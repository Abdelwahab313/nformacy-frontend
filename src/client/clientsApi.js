import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchClient = (client_id, tokenStr) => {
  return axios.get(`${API_BASE_URL}/clients/${client_id}`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const fetchClients = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/clients/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const verifyClient = (client_id, tokenStr) => {
  return axios.patch(
    `${API_BASE_URL}/clients/${client_id}/verify_client`,
    {},
    { headers: { Authorization: `Bearer ${tokenStr.access_token}` } },
  );
};

const deleteClient = (client_id, tokenStr) => {
  return axios.delete(`${API_BASE_URL}/clients/${client_id}`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { fetchClients, fetchClient, verifyClient, deleteClient };
