import React, { createContext, useContext, useReducer } from 'react';

const defaultValues = {
  questionDetails: '',
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

export const QuestionActionTypes = {
  UPDATE_QUESTION: 'UPDATE_QUESTION',
};

const QuestionReducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.UPDATE_QUESTION:
      return { ...state, questionDetails: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useQuestionContext as useAuth, QuestionProvider as AuthProvider };
