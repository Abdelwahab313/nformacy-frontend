import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchServices = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/all`,
  }).then((response) => camelizeKeys(response));
};

export const fetchClientServices = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/client_services`,
  }).then((response) => camelizeKeys(response));
};

export const submitService = (service) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/`,
    data: decamelizeKeys({ ...service }),
  }).then((response) => camelizeKeys(response));
};

export const fetchServiceDetails = (serviceId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/services/${serviceId}`,
  }).then((response) => camelizeKeys(response));
};

export const returnToClient = (serviceId, comment) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/return_to_client`,
    data: decamelizeKeys({ comment }),
  }).then((response) => camelizeKeys(response));
};