import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchAllMeetings = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/meeting`,
  });
};
export { fetchAllMeetings };
