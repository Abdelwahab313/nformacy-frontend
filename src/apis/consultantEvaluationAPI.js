import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const evaluateConsultantInterview = (consultantEvaluation) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/consultant_evaluations`,
    data: decamelizeKeys({ ...consultantEvaluation }),
  }).then((response) => camelizeKeys(response));
};

export { evaluateConsultantInterview };
