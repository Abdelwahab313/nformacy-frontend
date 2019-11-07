import React from 'react';
import VerifiedClient from './VerfiedClient';
import UnVerifiedClient from './UnVerifiedClient';

const ClientStatus = ({ status, clientName, id, onStateChanged }) => {
  const isVerified = status;
  if (isVerified) {
    return <VerifiedClient />;
  }
  return (
    <UnVerifiedClient
      clientName={clientName}
      id={id}
      onStateChanged={onStateChanged}
    />
  );
};

export default ClientStatus;
