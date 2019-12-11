import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { fetchUsers } from '../salesRepsAPI';
import { useSalesRepState } from '../context';
import { SET_ERROR_MESSAGE, UPDATE_USERS } from '../context/contextAction';
import { convertObjectToArray } from '../utils';

const SalesRepsFetcher = () => {
  const [_, dispatch] = useSalesRepState();
  const { authTokens, setAuthTokens } = useAuth();
  const [usersLoading, setUsersLoading] = useState(false);

  function sortUsers(fetchedUsers) {
    return fetchedUsers.sort(
      (a, b) => new Date(a.date_joined) - new Date(b.date_joined),
    );
  }

  function handleAPIErrors(reason) {
    if (reason.message === 'Network Error') {
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: 'حدث خطأ أثناء الاتصال بالخادم',
      });
    } else if (reason.response.status === 401) {
      localStorage.removeItem('tokens');
      localStorage.removeItem('users');
      setAuthTokens();
    }
  }

  function getUsers() {
    setUsersLoading(true);
    return fetchUsers(authTokens)
      .then((res) => {
        return sortUsers(res.data);
      })
      .then((sortedUsers) => {
        const adaptedUsers = sortedUsers.map((user) =>
          convertObjectToArray(user),
        );
        dispatch({ type: UPDATE_USERS, payload: adaptedUsers });
      })
      .catch((reason) => {
        handleAPIErrors(reason);
      });
  }

  useEffect(() => {
    getUsers().finally(() => {
      setUsersLoading(false);
    });
  }, []);

  return {
    usersLoading,
  };
};

export default SalesRepsFetcher;
