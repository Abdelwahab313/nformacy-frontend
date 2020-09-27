import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const rateAnswer = (answerId, rating) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/answers/${answerId}/rate`,
    data: decamelizeKeys({ rating }),
  }).then((response) => camelizeKeys(response));
};
