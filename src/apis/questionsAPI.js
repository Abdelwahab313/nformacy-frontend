import axios from 'axios';
import { API_BASE_URL } from '../settings';

export const fetchAllQuestions = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/questions`,
  });
};
