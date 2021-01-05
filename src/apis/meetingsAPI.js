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
    url: `${API_BASE_URL}/meetings/${meetingId}`,
  }).then((response) => camelizeKeys(response));
};

const scheduleMeetingForCallService = (serviceId, callTime, freelancerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings/book_call`,
    data: decamelizeKeys({
      callType: 'call_service',
      serviceId,
      callTime,
      freelancerId,
    }),
  }).then((response) => camelizeKeys(response));
};

const scheduleMeetingWithFreelancer = (serviceId, callTime, freelancerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings/book_call`,
    data: decamelizeKeys({
      callType: 'question_service',
      serviceId,
      callTime,
      freelancerId,
    }),
  }).then((response) => camelizeKeys(response));
};

export {
  fetchAllMeetings,
  fetchMeetingDetails,
  scheduleMeetingForCallService,
  scheduleMeetingWithFreelancer,
};
