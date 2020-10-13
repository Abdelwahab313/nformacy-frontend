import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const markNotificationRead = (notificationId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/notifications/${notificationId}/read`,
  }).then((response) => camelizeKeys(response));
};

export const fetchRecentNotifications = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/notifications/recent`,
  }).then((response) => camelizeKeys(response));
};

export const fetchAllNotifications = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/notifications/`,
  }).then((response) => camelizeKeys(response).data);
};
