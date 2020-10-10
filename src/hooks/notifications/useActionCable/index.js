// libraries
import { useEffect, useContext } from 'react';

// ActionCableHooks
import { ActionCableContext } from './context';
import { ActionCableProvider } from './provider';

const useActionCable = (params, handlers = {}) => {
  const { conn } = useContext(ActionCableContext);

  const diff = JSON.stringify({ params, url: conn && conn._url });

  useEffect(() => {
    let subscription;

    if (params && conn) {
      subscription = conn.subscriptions.create(params, handlers);
    }

    return () => subscription && subscription.unsubscribe();
  }, [diff]);
};

export default useActionCable;

export { ActionCableProvider };
