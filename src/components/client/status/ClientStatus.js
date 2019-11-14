import React from 'react';
import VerifiedClient from './VerfiedClient';
import UnVerifiedClient from './UnVerifiedClient';

const ClientStatus = ({ status, clientName, uuid, onStateChanged }) => {
  const isVerified = status;
  if (isVerified) {
    return <VerifiedClient />;
  }
  return (
    <UnVerifiedClient
      clientName={clientName}
      uuid={uuid}
      onStateChanged={onStateChanged}
    />
  );
};

export default ClientStatus;
