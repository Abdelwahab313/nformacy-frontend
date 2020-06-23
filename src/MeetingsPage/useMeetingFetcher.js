import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/auth';
import { fetchAllMeetings } from '../apis/meetingsAPI';
import authManager from '../services/authManager';

const useMeetingsFetcher = () => {
  const [isLoading, setLoading] = useState(false);
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  function handleApiErrors(reason) {
    if (reason.message === 'Network Error') {
      setErrorMessage('something went wrong');
    } else if (reason.response.status === 401) {
      localStorage.removeItem('users');
      authManager.logout();
    }
  }

  function getMeetings() {
    setLoading(true);
    return fetchAllMeetings()
      .then((res) => {
        const meetings = res.data;
        setFetchedMeetings(meetings);
      })
      .catch((reason) => {
        handleApiErrors(reason);
      });
  }

  useEffect(() => {
    getMeetings();
    setLoading(false);
  }, [setLoading]);
  return { productsLoading: isLoading, fetchedMeetings, errorMessage };
};
export default useMeetingsFetcher;
