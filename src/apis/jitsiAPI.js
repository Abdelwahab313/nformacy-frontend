import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const requestMeetingJWT = () => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/jitsi/request_join_token`,
  }).then((response) => camelizeKeys(response));
};
