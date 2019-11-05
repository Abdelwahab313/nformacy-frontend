import React from 'react';
import VerifiedClient from './verfiedClient';
import UnVerifiedClient from './unverifiedClient';

const ClientStatus = (props) => {
  const isVerified = props.status;
  debugger;
  if (isVerified) {
    return <VerifiedClient />;
  }
  return <UnVerifiedClient clientName={props.clientName} />;
};

export default ClientStatus;
