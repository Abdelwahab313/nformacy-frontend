import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys } from 'humps';

export const fetchFields = (locale) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/fields`,
    params: { locale: locale },
  }).then((response) => camelizeKeys(response));
};
