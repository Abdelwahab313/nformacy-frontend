import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const fetchFreelancerActivities = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/home/freelancer_dashboard`,
  }).then((response) => camelizeKeys(response));
};
