import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const createConsultantEvaluation = (consultantEvaluation) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/consultant_evaluations`,
    data: decamelizeKeys({ ...consultantEvaluation }),
  }).then((response) => camelizeKeys(response));
};


const updateConsultantEvaluation = (consultantEvaluation) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/consultant_evaluations/${consultantEvaluation.id}`,
    data: decamelizeKeys({ ...consultantEvaluation }),
  }).then((response) => camelizeKeys(response));
};

const createOrUpdateConsultantEvaluation = (consultantEvaluation) => {
  if (!!consultantEvaluation.id) {
    return updateConsultantEvaluation(consultantEvaluation)
  } else {
    return createConsultantEvaluation(consultantEvaluation)

  }

}

const fetchEvaluationForConsultant = (userId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/consultant_evaluations/for_consultant`,
    params: decamelizeKeys({ userId }),
  }).then((response) => camelizeKeys(response));
};


export { createOrUpdateConsultantEvaluation, fetchEvaluationForConsultant };
