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

const scheduleMeeting = (meetingId, freelancerId, scheduledTime) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/meeting/${meetingId}/schedule_meeting`,
    data: decamelizeKeys({ freelancerId, scheduledTime }),
  }).then((response) => camelizeKeys(response));
};

export { fetchAllMeetings, fetchMeetingDetails, scheduleMeeting };
