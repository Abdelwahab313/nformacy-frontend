import React, { createContext, useContext, useReducer } from 'react';
import {
  SET_ERROR_MESSAGE,
  SET_INSERT_DIALOG_OPEN,
  UPDATE_USERS,
  CLOSE_INSERT_DIALOG_AND_SAVE,
  SET_UPDATE_DIALOG_OPEN,
  CLOSE_UPDATE_DIALOG_AND_SAVE,
} from './contextAction';

const SalesRepContext = createContext();
const defaultValues = {
  users: [],
  errorMessage: '',
  isInsertDialogOpen: false,
  isUpdateDialogOpen: false,
};

const SalesRepProvider = ({ children, initialValue }) => {
  const { Provider } = SalesRepContext;
  initialValue = { ...defaultValues, ...initialValue };
  return (
    <Provider value={useReducer(salesRepReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useSalesRepState = () => {
  const context = useContext(SalesRepContext);
  if (context === undefined) {
    throw new Error('useSalesRepState must be used within a SalesRepProvider');
  }
  return context;
};

const salesRepReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_INSERT_DIALOG_OPEN:
      return {
        ...state,
        isInsertDialogOpen: action.payload,
      };
    case SET_UPDATE_DIALOG_OPEN:
      return {
        ...state,
        isUpdateDialogOpen: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLOSE_INSERT_DIALOG_AND_SAVE:
      return {
        ...state,
        isInsertDialogOpen: false,
        users: [...state.users, action.payload],
      };
    case CLOSE_UPDATE_DIALOG_AND_SAVE:
      let toBeEditedIndex = state.users.findIndex(
        (user) => user[0] === action.payload[0],
      );
      state.users[toBeEditedIndex] = action.payload;
      return {
        ...state,
        isUpdateDialogOpen: false,
        users: state.users,
      };
  }
};

export { SalesRepProvider, useSalesRepState };
