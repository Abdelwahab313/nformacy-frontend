import React from 'react';
import { postUser } from './salesRepsAPI';
import { useAuth } from '../auth/auth';
import SalesRepForm from './components/SalesRepForm';
import { useSalesRepState } from './context';
import {
  CLOSE_INSERT_DIALOG_AND_SAVE,
  SET_ERROR_MESSAGE,
} from './context/contextAction';
import { convertObjectToArray } from './utils';

const AddSalesRepForm = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const [, dispatch] = useSalesRepState();

  const onSubmit = (data) => {
    postUser(data, authTokens)
      .then((response) => {
        dispatch({
          type: CLOSE_INSERT_DIALOG_AND_SAVE,
          payload: convertObjectToArray(response.data),
        });
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          let errorMessage = Object.values(response.data)
            .map((msg) => msg[0])
            .join(', ');
          dispatch({ type: SET_ERROR_MESSAGE, payload: errorMessage });
        }
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      });
  };

  return (
    <SalesRepForm
      pageTitle={'اضافه موظف جديد'}
      onSubmit={onSubmit}
      formType={'ADD'}
    />
  );
};
export default AddSalesRepForm;
