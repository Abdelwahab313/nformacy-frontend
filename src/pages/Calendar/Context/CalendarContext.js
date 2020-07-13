import React, { createContext, useContext, useReducer } from 'react';
import { UPDATE_SELECTED_DAY, UPDATE_SELECTED_TIME } from './contextActions';

const CalendarContext = createContext();
const defaultValues = {
  selectedDay: '',
  isUpdatedTime: false,
  isInteractable: true,
  availableDates: [
    {
      type: 'date',
      date: '2020-07-27',
      intervals: [
        {
          from: '09:00',
          to: '17:00',
        },
      ],
    },
  ],
};

const CalendarProvider = ({ children, initialValue }) => {
  initialValue = { ...defaultValues, ...initialValue };
  const { Provider } = CalendarContext;
  return (
    <Provider value={useReducer(calendarReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useCalendarState = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('UseCalendarState must be used within a CalendarProvider');
  }
  return context;
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_DAY:
      return { ...state, isUpdatedTime: false, selectedDay: action.payload };
    case UPDATE_SELECTED_TIME:
      return { ...state, isUpdatedTime: true, selectedDay: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useCalendarState, CalendarProvider };
