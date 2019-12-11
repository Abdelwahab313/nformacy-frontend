import { useAuth } from '../auth/auth';
import { useSalesRepState } from './context';
import { updateUser } from './salesRepsAPI';
import {
  CLOSE_UPDATE_DIALOG_AND_SAVE,
  SET_ERROR_MESSAGE,
} from './context/contextAction';
import { convertObjectToArray } from './utils';
import SalesRepForm from './components/SalesRepForm';
import React from 'react';

const EditSalesRepForm = ({ salesRep }) => {
  const { authTokens, setAuthTokens } = useAuth();
  const [, dispatch] = useSalesRepState();

  const onSubmit = (data) => {
    updateUser(salesRep[0], data, authTokens)
      .then((response) => {
        dispatch({
          type: CLOSE_UPDATE_DIALOG_AND_SAVE,
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
      pageTitle={'تعديل موظف'}
      onSubmit={onSubmit}
      formType={'EDIT'}
      first_name={salesRep[1]}
      last_name={salesRep[2]}
      phone_number={salesRep[4]}
      national_id={salesRep[5]}
      username={salesRep[6]}
    />
  );
};

export default EditSalesRepForm;
