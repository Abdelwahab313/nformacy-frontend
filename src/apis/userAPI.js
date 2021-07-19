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

const updateProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/update_profile`,
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

const getUser = (userId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/${userId}`,
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
const submitFullProfile = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/submit_full_profile`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const updateProfilePicture = (user) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/update_profile`,
    data: user,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

const uploadCV = (cv) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/upload_cv`,
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
const fetchPointsList = (userId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/${userId}/list_points_details`,
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

const createConsultant = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/create_user`,
    data: decamelizeKeys({ ...user }),
  }).then((response) => camelizeKeys(response));
};

const deactivateUser = (userId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/${userId}/deactivate`,
  }).then((response) => camelizeKeys(response));
};

const verifyEmail = (token) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/verify_email?token=${token}`,
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
  createConsultant,
  deactivateUser,
  verifyEmail,
  fetchPointsList,
  submitFullProfile,
  getUser
};
