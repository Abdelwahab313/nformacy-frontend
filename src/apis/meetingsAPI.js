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

const scheduleMeetingForCallService = (serviceId, callTime, candidateId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/services/${serviceId}/book_call`,
    data: decamelizeKeys({ callTime, candidateId }),
  }).then((response) => camelizeKeys(response));
};

const scheduleMeetingWithFreelancer = (callTime, freelancerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings`,
    data: decamelizeKeys({ callTime, freelancerId }),
  }).then((response) => camelizeKeys(response));
};

export {
  fetchAllMeetings,
  fetchMeetingDetails,
  scheduleMeetingForCallService,
  scheduleMeetingWithFreelancer,
};
