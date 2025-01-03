import React, { createContext, useContext, useReducer } from 'react';
import CallEvaluationActionTypes from './actionTypes';
// import CallEvaluationActionTypes from './actionTypes';

const defaultValues = {
  comment: '',
  ratingEvaluations: {}
};

const CallEvaluationContext = createContext();

const CallEvaluationProvider = ({ children, initialValue = {} }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = CallEvaluationContext;
  return (
    <Provider value={useReducer(CallEvaluationReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useCallEvaluationContext = () => {
  const context = useContext(CallEvaluationContext);
  if (context === undefined) {
    throw new Error('useCallEvaluationContext must be used within a CallEvaluationContext');
  }
  return context;
};

const CallEvaluationReducer = (state, action) => {
  switch (action.type) {
    case CallEvaluationActionTypes.UPDATE_RATINGS:
      const updatedRating = { ...state.ratingEvaluations, ...action.payload };
      return { ...state, ratingEvaluations: updatedRating };
      
    case CallEvaluationActionTypes.UPDATE_COMMENT:
      return { ...state, comment: action.payload };

    case CallEvaluationActionTypes.UPDATE_RATINGS_VIEWS:
      const updatedRatingView = { ...state.ratingEvaluations, ...action.payload };
      return { ...state, ratingEvaluations: updatedRatingView };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useCallEvaluationContext, CallEvaluationProvider };
