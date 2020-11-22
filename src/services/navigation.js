import { createBrowserHistory as createHistory } from 'history';

import { RoutesPaths } from 'constants/routesPath';
import authManager from 'services/authManager';

export const history = createHistory();

export const getQuestionDetailsLink = (questionId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.QuestionsDetails
      : RoutesPaths.App.QuestionsDetails,
    state: {
      questionId: questionId,
    },
  };
};

export const getServiceDetailsLink = (serviceId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.ServiceDetails
      : RoutesPaths.App.ServiceRequestDetails,
    state: {
      service: {
        serviceId: serviceId,
      },
    },
  };
};
