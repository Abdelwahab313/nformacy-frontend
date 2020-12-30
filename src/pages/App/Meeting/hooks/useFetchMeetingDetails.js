import { useEffect, useState } from 'react';
import { fetchMeetingDetails } from 'apis/meetingsAPI';
import authManager from 'services/authManager';
import { camelizeKeys } from 'humps';

const useFetchShowMeetingDetails = (meetingId) => {
  const [isLoading, setLoading] = useState(true);
  const [fetchedMeetingDetails, setFetchedMeetingDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  function handleApiErrors(reason) {
    if (reason.message === 'Network Error') {
      setErrorMessage('something went wrong');
    } else if (reason.response.status === 401) {
      setErrorMessage('Login session invalid, please log in again');
      localStorage.removeItem('user');
      authManager.logout();
    }
  }

  function getData() {
    setLoading(true);
    return fetchMeetingDetails(meetingId)
      .then((res) => {
        const meeting = camelizeKeys(res.data);
        setFetchedMeetingDetails(meeting);
      })
      .catch((reason) => {
        handleApiErrors(reason);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [setLoading]);
  return {
    isLoading,
    fetchedMeetingDetails,
    errorMessage,
  };
};

export default useFetchShowMeetingDetails;
