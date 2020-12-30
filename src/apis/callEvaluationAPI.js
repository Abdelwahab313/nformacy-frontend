import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const submitEvaluation = (meetingId, ratingsQuestions, comment) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/call_evaluations/`,
    data: decamelizeKeys({ meetingId, ratingsQuestions, comment }),
  }).then((response) => camelizeKeys(response));
};

export { submitEvaluation };