import React, { useEffect, useState } from 'react';
import authManager from 'services/authManager';

const useFetchData = (fetchApi) => {
  const [isLoading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
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
    if (!fetchApi) {
      return console.error('should pass a callback to hook');
    }
    setLoading(true);
    return fetchApi()
      .then((res) => {
        function compare(a, b) {
          if (a.referenceNumber < b.referenceNumber) {
            return -1;
          }
          if (a.referenceNumber > b.referenceNumber) {
            return 1;
          }
          return 0;
        }

        if (Array.isArray(res.data)) {
          const sortedData = res.data.sort(compare);
          setFetchedData(sortedData);
        }
        else setFetchedData(res.data)
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
    fetchedData,
    errorMessage,
  };
};

export default useFetchData;
