import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = (tokenStr) => {
  return axios.get(`${API_BASE_URL}/users/`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};
const fetchUser = (user_id, tokenStr) => {
  return axios.get(`${API_BASE_URL}/users/${user_id}`, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};
const postUser = (user, tokenStr) => {
  return axios.post(`${API_BASE_URL}/users/`, user, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const updateUser = (user_uuid, user, tokenStr) => {
  return axios.patch(`${API_BASE_URL}/users/${user_uuid}`, user, {
    headers: { Authorization: `Bearer ${tokenStr.access_token}` },
  });
};

const resetPassword = (user_uuid, password, tokenStr) => {
  return axios.patch(
    `${API_BASE_URL}/users/${user_uuid}`,
    { password: password },
    {
      headers: { Authorization: `Bearer ${tokenStr.access_token}` },
    },
  );
};

const addInventoryToUser = (user_uuid, inventoryProducts, tokenStr) => {
  return axios.post(
    `${API_BASE_URL}/inventory/transaction/`,
    {
      to_uuid: user_uuid,
      products: inventoryProducts,
    },
    {
      headers: { Authorization: `Bearer ${tokenStr.access_token}` },
    },
  );
};

export {
  fetchUsers,
  postUser,
  fetchUser,
  updateUser,
  resetPassword,
  addInventoryToUser,
};
