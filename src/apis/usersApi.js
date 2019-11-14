import axios from 'axios';
import { API_BASE_URL } from '../settings';

const fetchUsers = () => {
  return axios.get(`${API_BASE_URL}/users/`);
};
const postUser = (user) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/`,
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.user_name,
      phone_number: user.phone_number,
      national_id: user.national_id,
      password: user.password,
    },
  });
};

export { fetchUsers, postUser };
