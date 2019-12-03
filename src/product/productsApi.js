import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchProducts = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/products/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};
const fetchProduct = (productId, tokenStr) => {
  return axios.get(`${API_BASE_URL}/products/${productId}`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const postProduct = (product, tokenStr) => {
  return axios.post(`${API_BASE_URL}/products/`, product, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const editProduct = (product, productUUID, tokenStr) => {
  return axios.patch(`${API_BASE_URL}/products/${productUUID}`, product, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

export { fetchProducts, postProduct, fetchProduct, editProduct };
