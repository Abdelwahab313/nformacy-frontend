import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const markNotificationRead = (notificationId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/notifications/${notificationId}/read`,
  }).then((response) => camelizeKeys(response));
};
