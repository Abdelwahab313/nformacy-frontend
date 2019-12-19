import React, { createContext, useContext, useReducer } from 'react';
import {
  SET_ERROR_MESSAGE,
  UPDATE_CLIENTS,
  UPDATE_CURRENT_CLIENT,
  VERIFY_CLIENT,
  VERIFY_CURRENT_CLIENT,
} from './actionTypes';

const ClientContext = createContext();
const defaultValues = {
  clients: [],
  errorMessage: '',
};

const ClientProvider = ({ children, initialValue }) => {
  const { Provider } = ClientContext;
  initialValue = { ...defaultValues, ...initialValue };
  return (
    <Provider value={useReducer(clientReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useClientState = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientState must be used within a ClientProvider');
  }
  return context;
};

const clientReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case UPDATE_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: action.payload,
      };
    case VERIFY_CURRENT_CLIENT:
      const currentClient = state.currentClient;
      currentClient.verified = true;
      return {
        ...state,
        currentClient: currentClient,
      };
    case VERIFY_CLIENT:
      const newClients = state.clients.map((client) => {
        if (client[0] === action.payload.uuid) {
          client[6] = true;
          return client;
        } else {
          return client;
        }
      });
      return {
        ...state,
        clients: newClients,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
  }
};

export { ClientProvider, useClientState };
