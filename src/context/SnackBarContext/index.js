import React, { createContext, useContext, useReducer } from 'react';
import SnackBarActionTypes from './actionTypes';
import SnackBarReducer from './snackbarReducer';

const defaultValues = {
  message: '',
  isError: false,
};

const SnackBarContext = createContext();

const SnackBarProvider = ({ children, initialValue = {} }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = SnackBarContext;
  return (
    <Provider value={useReducer(SnackBarReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (context === undefined) {
    throw new Error('useSnackBarContext must be used within a SnackBarContext');
  }
  const [{ message, isError }, dispatch] = context;

  const showSuccessMessage = (message) => {
    dispatch({
      type: SnackBarActionTypes.UPDATE_SUCCESS_MESSAGE,
      payload: message,
    });
  };
  const showErrorMessage = (message) => {
    dispatch({
      type: SnackBarActionTypes.UPDATE_ERROR_MESSAGE,
      payload: message,
    });
  };
  const resetMessage = () => {
    dispatch({
      type: SnackBarActionTypes.EMPTY_MESSAGE,
    });
  };

  return {
    message,
    isError,
    showErrorMessage,
    showSuccessMessage,
    resetMessage,
  };
};

export { useSnackBar, SnackBarProvider };
