import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './index.css';
import Main from 'layouts/Main';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
import { Router } from 'react-router';
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
import useEmailResetCurrentSession from 'hooks/useEmailResetCurrentSession';

const Loader = () => <LoadingCircle color='primary' />;

const App = () => {
  const user = authManager.retrieveCurrentUser();

  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);

  useEmailResetCurrentSession();

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
