import { createBrowserHistory as createHistory } from 'history';

import { RoutesPaths } from 'constants/routesPath';
import authManager from 'services/authManager';

export const history = createHistory();

export const getQuestionDetailsLink = (questionId, serviceId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.QuestionsDetails
      : RoutesPaths.App.ServiceDetails,
    state: {
      serviceId: serviceId,
      questionId: questionId,
    },
  };
};

export const getServiceDetailsLink = (serviceId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.ServiceDetails
      : RoutesPaths.App.ServiceDetails,
    state: {
      serviceId: serviceId,
      service: {
        serviceId: serviceId,
      },
    },
  };
};
export const getEditServiceDetailsLink = (serviceId) => {
  return {
    pathname: authManager.isAdmin()
      ? RoutesPaths.Admin.ServiceDetails
      : RoutesPaths.App.EditServiceRequest,
    state: {
      service: {
        serviceId: serviceId,
      },
    },
  };
};

export const getAdminQuestionsDashboardLink = () => {
  if (authManager.isAdviser()) {
    return RoutesPaths.Admin.Questions;
  } else {
    return RoutesPaths.Admin.Services;
  }
};

export const getAnswerQuestionLink = (questionId) => {
  return {
    pathname: RoutesPaths.App.AnswerQuestion,
    state: {
      questionDetails: {
        id: questionId,
      },
    },
  };
};

export const getAnswerQuestionLinkForAdmin = (questionId) => {
  return {
    pathname: RoutesPaths.Admin.QuestionsDetails,
    state: {
      questionDetails: {
        id: questionId,
      },
    },
  };
};

export const getCallEvaluationLink = (meetingId, serviceId) => {
  return {
    pathname: RoutesPaths.App.CallEvaluation,
    state: {
      meetingId: meetingId,
      serviceId: serviceId
    },
  };
};
