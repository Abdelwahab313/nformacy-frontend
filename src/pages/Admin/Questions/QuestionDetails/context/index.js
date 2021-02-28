import React, { createContext, useContext, useReducer } from 'react';
import QuestionActionTypes from './actionTypes';

const defaultValues = {
  questionDetails: {},
  message: '',
  isError: false,
  isModified: false,
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
    throw new Error('useQuestionContext must be used within a QuestionContext');
  }
  return context;
};

const QuestionReducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.UPDATE_QUESTION:
      return {
        ...state,
        isModified: false,
        questionDetails: {
          ...state.questionDetails,
          ...action.payload,
        },
      };

    case QuestionActionTypes.UPDATE_QUESTION_FIELD:
      return {
        ...state,
        isModified: true,
        questionDetails: {
          ...state.questionDetails,
          ...action.payload,
        },
      };

    case QuestionActionTypes.UPDATE_SUCCESS_MESSAGE:
      return { ...state, isError: false, message: action.payload };

    case QuestionActionTypes.RESET_MODIFIED_STATE:
      return { ...state, isModified: false };

    case QuestionActionTypes.UPDATE_ERROR_MESSAGE:
      return { ...state, isError: true, message: action.payload };

    case QuestionActionTypes.EMPTY_MESSAGE:
      return { ...state, isError: false, message: '' };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useQuestionContext, QuestionProvider };
