import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './index.css';
import Main from 'layouts/Main';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
import { Router, useLocation } from 'react-router';
import WebFont from 'webfontloader';
import { history } from './services/navigation';
import { LocaleProvider } from './hooks/localization/context';
import { AuthProvider } from './pages/auth/context/auth';
import authManager from './services/authManager';
import LoadingCircle from './components/progress/LoadingCircle';
import 'moment/locale/ar';
import { SnackBarProvider } from 'context/SnackBarContext';
import ErrorBoundary from 'components/errors/ErrorBoundary';
import { GOOGLE_ANALYTICS_TRACKING_ID } from 'settings';
import useQueryParams from 'hooks/useQueryParams';
import { RoutesPaths } from 'constants/routesPath';

const Loader = () => <LoadingCircle color='primary' />;

const App = () => {
  const user = authManager.retrieveCurrentUser();
  const location = useLocation();
  const urlParams = useQueryParams();
  const redirectLink = `${location.pathname}${location.search}`;

  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);


  useEffect(() => {
    const isShouldDestroyCurrentSession = !!urlParams.get('token') && !!user;
    if (isShouldDestroyCurrentSession) {
      history.push(`${RoutesPaths.App.Logout}?redirectLink=${redirectLink || ''}`);
    }
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider initialValue={{ currentUser: user }}>
        <LocaleProvider initialLocale={user?.locale}>
          <SnackBarProvider>
            <Suspense fallback={<Loader />}>
              <Main />
            </Suspense>
          </SnackBarProvider>
        </LocaleProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

WebFont.load({
  google: {
    families: ['Orbitron', 'sans-serif'],
  },
});
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
