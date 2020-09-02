import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchOpenedQuestions = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAllQuestions = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions/all`,
  })
    .then((response) => camelizeKeys(response));
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
    url: `${API_BASE_URL}/rich_text_media/upload_image`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

export const submitAnswer = (questionId, answer) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/questions/${questionId}/answer`,
    data: decamelizeKeys({ ...answer }),
  }).then((response) => camelizeKeys(response));
};

export const submitQuestion = (question) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/questions/`,
    data: decamelizeKeys({ ...question }),
  }).then((response) => camelizeKeys(response));
};

export const updateQuestion = (questionId, updatedQuestion) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/questions/${questionId}`,
    data: decamelizeKeys({ ...updatedQuestion }),
  }).then((response) => camelizeKeys(response));
};

export const approveQuestion = (questionId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/questions/${questionId}/approve`,
  }).then((response) => camelizeKeys(response));
};

export const uploadQuestionDocument = (questionId, document) => {
  return axios({
    method: 'post',
    data: document,
    url: `${API_BASE_URL}/questions/${questionId}/upload_document`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

export const uploadAnswerDocument = (answerId, document) => {
  return axios({
    method: 'post',
    data: document,
    url: `${API_BASE_URL}/questions/answer/${answerId}/upload_document`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};
