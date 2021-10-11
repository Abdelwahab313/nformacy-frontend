// Global Imports
import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Internal Imports
import useQueryParams from './useQueryParams';
import authManager from 'services/authManager';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';


const useEmailResetCurrentSession = () => {
  const user = authManager.retrieveCurrentUser();
  const location = useLocation();
  const urlParams = useQueryParams();
  const redirectLink = encodeURIComponent(`${location.pathname}${location.search}`);

  useEffect(() => {
    const isShouldDestroyCurrentSession = !!urlParams.get('token') && !!user;
    if (isShouldDestroyCurrentSession) {
      history.push(`${RoutesPaths.App.Logout}?redirectLink=${redirectLink || ''}`);
    }
  }, []);

};


export default useEmailResetCurrentSession;