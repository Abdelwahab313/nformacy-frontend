import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const fetchConsultants = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/list_consultants`,
  }).then((response) => camelizeKeys(response));
};

export const fetchConsultantsDetails = (consultantId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/${consultantId}`,
  }).then((response) => camelizeKeys(response));
};