// libraries
import { useEffect, useContext, useMemo } from 'react';

// ActionCableHooks
import { ActionCableContext } from './context';
import { ActionCableProvider } from './provider';
import authManager from 'services/authManager';
import { NOTIFICATION_CHANNEL_IDENTIFIER } from 'settings';

const useActionCable = (handlers = {}) => {
  const { conn } = useContext(ActionCableContext);
  const currentUser = authManager.retrieveCurrentUser();

  const params = useMemo(
    () => ({ channel: NOTIFICATION_CHANNEL_IDENTIFIER }),
    [],
  );

  const diff = JSON.stringify({ params, url: conn && conn._url });

  useEffect(() => {
    let subscription;

    if (params && conn && currentUser) {
      subscription = conn.subscriptions.create(params, handlers);
    }

    return () => subscription && subscription.unsubscribe();
  }, [diff]);
};

export default useActionCable;

export { ActionCableProvider };
