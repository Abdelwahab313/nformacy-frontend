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

  function adaptDataForPresentation(sortedProducts) {
    return sortedProducts.map((product) => [
      product.uuid,
      product.name,
      product.sku,
      product.price,
    ]);
  }

  function getMeetings() {
    setLoading(true);
    return fetchAllMeetings()
      .then((res) => {
        const adaptedMeetings = adaptDataForPresentation(res.data);
        setFetchedMeetings(adaptedMeetings);
      })
      .catch((reason) => {
        handleApiErrors(reason);
      });
  }

  useEffect(() => {
    getMeetings().finally(() => {
      setLoading(false);
    });
  }, [setLoading]);
  return { productsLoading: isLoading, fetchedMeetings, errorMessage };
};
export default useMeetingsFetcher;
