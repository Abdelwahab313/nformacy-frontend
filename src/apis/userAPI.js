import axios from 'axios';
import { API_BASE_URL } from '../settings';

const signup = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users`,
    data: { ...user },
  });
};

export default signup;
