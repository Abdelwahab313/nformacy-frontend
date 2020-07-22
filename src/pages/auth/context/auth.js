import React, { createContext, useContext, useReducer } from 'react';

const defaultValues = {
  currentUser: '',
};
const AuthContext = createContext();

const AuthProvider = ({ children, initialValue = defaultValues }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = AuthContext;
  return (
    <Provider value={useReducer(AuthReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthActionTypes = {
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  LOGOUT_USER: 'LOGOUT_USER',
};

const AuthReducer = (state, action) => {
  switch (action.type) {

    case AuthActionTypes.UPDATE_CURRENT_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case AuthActionTypes.LOGOUT_USER:
      localStorage.removeItem('user');
      return { ...state, currentUser: '' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};


export { useAuth, AuthProvider };
