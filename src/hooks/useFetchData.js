import { useEffect, useState } from 'react';
import authManager from 'services/authManager';

const useFetchData = (fetchApi) => {
  const [isLoading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function handleApiErrors(reason) {
    if (reason.message === 'Network Error') {
      setErrorMessage('something went wrong');
    } else if (reason?.response?.status === 401) {
      setErrorMessage('Login session invalid, please log in again');
      localStorage.removeItem('user');
      authManager.logout();
    }
  }

  function getData() {
    if (!fetchApi) {
      throw Error('should pass a callback to hook');
    }
    setLoading(true);
    return fetchApi()
      .then((res) => {
        setFetchedData(res.data);
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
  }, []);

  return {
    isLoading,
    fetchedData,
    setFetchedData,
    errorMessage,
  };
};

export default useFetchData;
