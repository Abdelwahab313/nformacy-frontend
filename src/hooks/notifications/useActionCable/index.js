// libraries
import { useEffect, useContext } from 'react';

// ActionCableHooks
import { ActionCableContext } from './context';
import { ActionCableProvider } from './provider';
import { useAuth } from '../../../pages/auth/context/auth';

const useActionCable = (params, handlers = {}) => {
  const { conn } = useContext(ActionCableContext);
  const [{ currentUser }] = useAuth();

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
