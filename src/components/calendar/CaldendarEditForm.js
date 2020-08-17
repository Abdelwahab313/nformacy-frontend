import * as React from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const messages = {
  moreInformationLabel: '',
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}></AppointmentForm.BasicLayout>
  );
};

export default { messages, TextEditor, BasicLayout };
