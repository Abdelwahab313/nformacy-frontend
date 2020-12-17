import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const signup = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const updateProfile = (user, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const changeLocaleAPI = (userId, locale) => {
  return axios({
    method: 'PATCH',
    url: `${API_BASE_URL}/users/${userId}/language`,
    data: { locale },
  }).then((response) => camelizeKeys(response));
};

const completeClientProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/complete_client_profile`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const completeFreelancerProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/complete_freelancer_profile`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const updateProfilePicture = (user, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: user,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

const uploadCV = (cv, userId) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${userId}`,
    data: cv,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

const fetchAdvisersList = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_advisers`,
  }).then((response) => camelizeKeys(response));
};

const fetchCurrentUserFields = (locale) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/fields`,
    params: { locale: locale },
  }).then((response) => camelizeKeys(response.data));
};

const fetchUserDetails = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/me`,
  }).then((response) => camelizeKeys(response));
};

const addUserRole = (role) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/add_role`,
    data: { role },
  }).then((response) => camelizeKeys(response));
};

export {
  signup,
  updateProfile,
  updateProfilePicture,
  uploadCV,
  completeFreelancerProfile,
  fetchAdvisersList,
  changeLocaleAPI,
  fetchCurrentUserFields,
  fetchUserDetails,
  addUserRole,
  completeClientProfile,
};
