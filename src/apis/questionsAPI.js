import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchOpenedQuestions = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions`,
  }).then((response) => camelizeKeys(response));
};

export const fetchQuestionsOfAdviser = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions/adviser_questions`,
  })
    .then((response) => camelizeKeys(response));
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

export const uploadImage = (image) => {
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

export const saveDraftQuestion = (question) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/questions/save`,
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

export const uploadAttachment = (attachment) => {
  return axios({
    method: 'post',
    data: attachment,
    url: `${API_BASE_URL}/attachments_groups/upload_attachment`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => camelizeKeys(response));
};

export const removeAttachment = (attachmentId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/attachments_groups/remove_attachment`,
    data: decamelizeKeys({ attachmentId }),
  }).then((response) => camelizeKeys(response));
}
