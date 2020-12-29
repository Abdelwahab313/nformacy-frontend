import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const submitEvaluation = (meetingId, ratingEvaluations, comment) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/evaluation/`,
    data: decamelizeKeys({ ratingEvaluations, comment }),
  }).then((response) => camelizeKeys(response));
};

export {submitEvaluation};