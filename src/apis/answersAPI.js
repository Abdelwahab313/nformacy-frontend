import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchFreelancerAnswers = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/answers/freelancer_answers`,
  }).then((response) => camelizeKeys(response));
};

export const rateAnswer = (answerId, rating) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/${answerId}/rate`,
    data: decamelizeKeys({ rating }),
  }).then((response) => camelizeKeys(response));
};

export const acceptAnswer = (answerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/${answerId}/accept`,
  }).then((response) => camelizeKeys(response));
};

export const rejectAnswer = (answerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/${answerId}/reject`,
  }).then((response) => camelizeKeys(response));
};

export const rollbackAnswer = (answerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/${answerId}/rollback`,
  }).then((response) => camelizeKeys(response));
};

export const shortlistAnswer = (answers_ids) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/shortlist_answers`,
    data: decamelizeKeys({ answers_ids }),
  }).then((response) => camelizeKeys(response));
};
