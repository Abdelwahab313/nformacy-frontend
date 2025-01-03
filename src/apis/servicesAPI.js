import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchServices = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/all`,
  }).then((response) => camelizeKeys(response));
};

export const fetchClientServices = (clientId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/client_services?client_id=${clientId}`,
    data: decamelizeKeys({ clientId }),
  }).then((response) => camelizeKeys(response));
};

export const createService = (service) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/`,
    data: decamelizeKeys({ ...service }),
  }).then((response) => camelizeKeys(response));
};

export const addQuestionToRoaster = (service) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/add_question_to_roaster`,
    data: decamelizeKeys({ ...service }),
  }).then((response) => camelizeKeys(response));
};

export const updateService = (service) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/services/${service.id}`,
    data: decamelizeKeys({ ...service }),
  }).then((response) => camelizeKeys(response));
};

export const createOrUpdateService = (service) => {
  if (!!service.id) {
    return updateService(service);
  } else {
    return createService(service);
  }
};

export const fetchServiceDetails = (serviceId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/${serviceId}`,
  }).then((response) => camelizeKeys(response));
};

export const generateQuestion = (serviceId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/generate_question`,
  }).then((response) => camelizeKeys(response));
};

export const rollbackQuestion = (serviceId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/rollback_question`,
  }).then((response) => camelizeKeys(response));
};

export const returnToClient = (serviceId, comment) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/return_to_client`,
    data: decamelizeKeys({ comment }),
  }).then((response) => camelizeKeys(response));
};

export const updateMentoringAvailability = (serviceId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/submit_availability`,
  }).then((response) => camelizeKeys(response));
};
