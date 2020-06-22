import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/auth';
import { fetchAllMeetings } from '../apis/meetingsAPI';

const useMeetingsFetcher = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [fetchedMeetings, setFetchedMeetings] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  function handleApiErrors(reason) {
    if (reason.message === 'Network Error') {
      setErrorMessage('something went wrong');
    } else if (reason.response.status === 401) {
      localStorage.removeItem('tokens');
      localStorage.removeItem('users');
      setAuthTokens();
    }
  }

  function getMeetings() {
    setLoading(true);
    // return fetchAllMeetings()
    //   .then((res) => {
    //     const meetings = res.data
    const meetings = [
      {
        id: 1,
        field: 'test field',
        user_id: 3,
        created_at: '2020-06-22T15:13:43.155Z',
        updated_at: '2020-06-22T15:13:43.155Z',
        status: 'Pending',
        description: 'this is a description',
        subfield: 'test sub field',
        industry: 'Engineering',
        special_requirements: '123',
      },
      {
        id: 2,
        field: 'test field',
        user_id: 3,
        created_at: '2020-06-22T15:13:57.756Z',
        updated_at: '2020-06-22T15:13:57.756Z',
        status: 'Pending',
        description: 'this is a description',
        subfield: 'test sub field',
        industry: 'Engineering',
        special_requirements: '123',
      },
    ];
    setFetchedMeetings(meetings);
    // })
    // .catch((reason) => {
    //   handleApiErrors(reason);
    // });
  }

  useEffect(() => {
    getMeetings();
    setLoading(false);
  }, [setLoading]);
  return { productsLoading: isLoading, fetchedMeetings, errorMessage };
};
export default useMeetingsFetcher;
