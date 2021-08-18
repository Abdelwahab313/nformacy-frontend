import { useLocation } from 'react-router';

const useLocationState = (callback) => {
  const location = useLocation();
  const locationState = location?.state;

  return callback(locationState);
};

export default useLocationState;
