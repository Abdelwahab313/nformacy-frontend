// libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActionCable from 'action-cable-react-jwt';
// ActionCableHooks
import { ActionCableContext } from './context';

import AuthManager from '../../../services/authManager';

const propTypes = {
  url: PropTypes.string,
  children: PropTypes.any,
};

const defaultProps = {
  url: null,
  children: null,
};

export const ActionCableProvider = ({ url, children }) => {
  const [conn, setConn] = useState(null);

  useEffect(() => {
    if (!conn) {
      const { authToken } = AuthManager.retrieveUserToken();
      setConn(ActionCable.createConsumer(url, authToken));
    }

    return () => conn && conn.disconnect();
  }, []);

  return (
    <ActionCableContext.Provider value={{ conn }}>
      {children}
    </ActionCableContext.Provider>
  );
};

ActionCableProvider.propTypes = propTypes;
ActionCableProvider.defaultProps = defaultProps;
