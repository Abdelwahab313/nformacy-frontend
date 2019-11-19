import axios from 'axios';
import { API_BASE_URL } from '../settings';

const getSalesWithDate = (start_date, end_date, token) => {
  axios({
    method: 'get',
    url: `${API_BASE_URL}/sales/?start_date=${start_date}&end_date=${end_date}`,
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
};
