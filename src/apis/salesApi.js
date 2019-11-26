import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchSales = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/sales/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};
const getSalesWithDate = (start_date, end_date, token) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/sales/?start_date=${start_date}&end_date=${end_date}`,
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
};
const getSaleWithUUID = (UUID, token) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/sales/${UUID}`,
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
};

export { fetchSales, getSalesWithDate, getSaleWithUUID };
