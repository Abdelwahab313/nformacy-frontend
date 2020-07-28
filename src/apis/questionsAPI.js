import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const fetchAllQuestions = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions`,
  }).then((response) => camelizeKeys(response));
};


export const fetchQuestionDetails = (questionId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions/${questionId}`,
  }).then((response) => camelizeKeys(response));
};

export const uploadImage = (questionId, image) => {
  return axios({
    method: 'post',
    data: image,
    url: `${API_BASE_URL}/questions/${questionId}/upload_image`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

export const uploadDocument = (questionId, document) => {
  return axios({
    method: 'post',
    data: document,
    url: `${API_BASE_URL}/questions/${questionId}/upload_document`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};
