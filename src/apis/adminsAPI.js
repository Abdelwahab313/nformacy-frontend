import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { ADMIN_ROLES } from 'constants/userRoles';

export const addAdmin = (user) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ ...user }),
    url: `${API_BASE_URL}/users/create_admin`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAdmins = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_admins`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAdminDetails = (adminId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/${adminId}`,
  }).then((response) => camelizeKeys(response));
};

export const updateAdmin = (adminId, user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${adminId}`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

export const fetchConsultantManagers = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_admins?role=${ADMIN_ROLES.consultantsManager}`,
  }).then((response) => camelizeKeys(response));
};
