import React, { createContext, useContext, useReducer } from 'react';
import QuestionActionTypes from './actionTypes';

const defaultValues = {
  questionDetails: {},
  message: '',
  isError: false,
};

const QuestionContext = createContext();

const QuestionProvider = ({ children, initialValue = {} }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = QuestionContext;
  return (
    <Provider value={useReducer(QuestionReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestionContext must be used within a AuthProvider');
  }
  return context;
};

const QuestionReducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.UPDATE_QUESTION:
      const updatedQuestion = { ...state.questionDetails, ...action.payload };
      return { ...state, questionDetails: updatedQuestion };

    case QuestionActionTypes.UPDATE_SUCCESS_MESSAGE:
      return { ...state, isError: false, message: action.payload };

    case QuestionActionTypes.UPDATE_ERROR_MESSAGE:
      return { ...state, isError: true, message: action.payload };

    case QuestionActionTypes.EMPTY_MESSAGE:
      return { ...state, isError: false, message: '' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useQuestionContext, QuestionProvider };
