import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchProducts = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/products/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const postProduct = (product, tokenStr) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/products/`,
    data: product,
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { fetchProducts, postProduct };
