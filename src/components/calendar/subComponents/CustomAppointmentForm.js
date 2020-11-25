import React from 'react';

import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import CalenderCommandButtons from './CalendarCommandButtons';

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'titleTextEditor',
    'multilineTextEditor',
    'numberEditor',
  ];
  if (excludeFields.includes(props.type)) {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const DateEditor = (props) => {
  return (
    <DatePicker
      selected={new Date(props.value)}
      onChange={props.onValueChange}
      showTimeSelect
      timeFormat='HH:mm'
      dateFormat='yyyy-MM-dd HH:mm'
      customInput={<TextField variant='outlined' />}
      timeIntervals={15}
    />
  );
};

const BooleanEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = ['All Day', 'Repeat'];
  if (excludeFields.includes(props.label)) {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};

const ResourceEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.resource.title === 'Owners') {
    return null;
  }
  return <AppointmentForm.Select {...props} />;
};

const LabelEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const excludeFields = [
    'Title',
    'More Information',
    'Owners',
    'Repeat',
    'End Repeat',
  ];
  if (excludeFields.includes(props.text)) {
    return null;
  }
  return <AppointmentForm.Label {...props} />;
};

const CustomAppointmentForm = () => {
  return (
    <AppointmentForm
      commandButtonComponent={CalenderCommandButtons}
      textEditorComponent={TextEditor}
      dateEditorComponent={DateEditor}
      booleanEditorComponent={BooleanEditor}
      resourceEditorComponent={ResourceEditor}
      labelComponent={LabelEditor}
    />
  );
};

export default CustomAppointmentForm;
