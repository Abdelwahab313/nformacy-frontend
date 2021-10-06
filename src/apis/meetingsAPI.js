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

const scheduleMeetingForMentoringService = (serviceId, callTime, freelancerId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings/book_call`,
    data: decamelizeKeys({
      callType: 'mentoring_service',
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

const scheduleMeetingWithConsultantManager = (callTime, adminId) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meetings/book_admin_call`,
    data: decamelizeKeys({
      callTime,
      adminId,
    }),
  }).then((response) => camelizeKeys(response));
};


const fetchScheduledMeetings = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/meetings/scheduled_meetings`,
  }).then((response) => camelizeKeys(response));
};



const fetchAdminMeetings = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/meetings/admin_meetings`,
  }).then((response) => camelizeKeys(response));
};


export {
  fetchAllMeetings,
  fetchMeetingDetails,
  fetchScheduledMeetings,
  fetchAdminMeetings,
  scheduleMeetingForCallService,
  scheduleMeetingForMentoringService,
  scheduleMeetingWithFreelancer,
  scheduleMeetingWithConsultantManager,
};
