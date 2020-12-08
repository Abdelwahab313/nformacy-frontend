import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const fetchAllMeetings = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/meeting`,
  });
};

const fetchMeetingDetails = (meetingId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/meeting/${meetingId}`,
  });
};

const scheduleMeeting = (serviceId, callTime, candidateId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/book_call`,
    data: decamelizeKeys({ callTime, candidateId }),
  }).then((response) => camelizeKeys(response));
};

export { fetchAllMeetings, fetchMeetingDetails, scheduleMeeting };
