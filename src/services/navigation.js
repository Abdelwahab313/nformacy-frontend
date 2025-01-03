import { createBrowserHistory as createHistory } from 'history';

import { RoutesPaths } from 'constants/routesPath';
import authManager from 'services/authManager';
import AdminGuardian from 'core/guardians/AdminGuardian';

export const history = createHistory();

export const pushWithForceRefresh = createHistory({ forceRefresh: true }).push;

export const getQuestionDetailsLink = (questionId, serviceId) => {
  if (authManager.isAdmin()) {
    return getQuestionDetailsLinkForAdmin(questionId);
  } else {
    return getServiceDetailsLink(serviceId);
  }
};

export const getPostVerifyEmailRoute = () => {
  if (!authManager.getUserRole()) {
    return RoutesPaths.App.UserTypeSelection;
  } else {
    return RoutesPaths.App.Dashboard;
  }
};

export const navigatToDashboard = () => {
  history.goBack();
};

export const getAdminDashboardHomePage = () => {
  authManager.retrieveCurrentUser();
  if (AdminGuardian.showRequestsPanel()) {
    return RoutesPaths.Admin.Services;
  } else if (AdminGuardian.showQuestionsPanel()) {
    return RoutesPaths.Admin.Questions;
  } else {
    return RoutesPaths.Admin.Dashboard;
  }
};

export const getDashboardLinkAfterSignup = (isCompletedProfile) => {
  return {
    pathname: RoutesPaths.App.Dashboard,
    state: { isRecentlyRegistered: isCompletedProfile },
  };
};

export const getQuestionDetails = (questionId) => {
  if (authManager.isAdmin()) {
    return getQuestionDetailsLinkForAdmin(questionId);
  } else if (authManager.isNormalUser()) {
    return getAnswerQuestionLink(questionId);
  } else {
    return 'unauthorzed_user';
  }
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

export const getSubAccounts = (corporateId) => {
  return {
    pathname: RoutesPaths.Admin.SubAccount,
    state: {
      corporateId,
    },
  };
};

export const getAdminsList = () => {
  return {
    pathname: RoutesPaths.Admin.Admins,
  };
};

export const getAdvisorsList = () => {
  return {
    pathname: RoutesPaths.Admin.Advisors,
  };
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

export const getQuestionDetailsLinkForAdmin = (questionId) => {
  return {
    pathname: RoutesPaths.Admin.QuestionsDetails,
    state: { questionId },
  };
};

export const getConsultantVerificationMeetingDetails = (meetingId) => {
  return {
    pathname: RoutesPaths.Admin.ConsultantVerificationDetails,
    state: { meetingId },
  };
};

export const getConsultantEvaluationFormPage = (consultantId) => {
  return {
    pathname: RoutesPaths.Admin.ConsultantVerificationForm,
    state: { consultantId },
  };
};

export const getCallEvaluationLink = (meetingId, serviceId) => {
  return {
    pathname: RoutesPaths.App.CallEvaluation,
    state: {
      meetingId: meetingId,
      serviceId: serviceId,
    },
  };
};

export const getCallEvaluationView = (meetingId) => {
  return {
    pathname: RoutesPaths.Admin.Evaluations,
    state: {
      meetingId: meetingId,
    },
  };
};

export const getJitsiCall = (jwt, roomId) => {
  return {
    pathname: RoutesPaths.App.JitsiCall,
    state: {
      jwt,
      roomId,
    },
  };
};

export const getAdminDetails = (adminId) => {
  return {
    pathname: RoutesPaths.Admin.AdminDetails,
    state: {
      adminId: adminId,
    },
  };
};

export const getAdvisorDetails = (adviserId) => {
  return {
    pathname: RoutesPaths.Admin.AdvisersDetails,
    state: {
      adviserId: adviserId,
    },
  };
};

export const getProjectManagerDetails = (projectManagerId) => {
  return {
    pathname: RoutesPaths.Admin.AddProjectManager,
    state: {
      projectManagerId,
    },
  };
};

export const getClientProfileDetails = (clientId) => {
  return {
    pathname: RoutesPaths.Admin.ClientProfileDetails,
    state: {
      clientId: clientId,
    },
  };
};
export const getClientDetails = (clientId) => {
  return {
    pathname: RoutesPaths.Admin.ClientDetails,
    state: {
      clientId: clientId,
    },
  };
};
export const getClientDetailsView = (clientId) => {
  return {
    pathname: RoutesPaths.Admin.ClientDetailsView,
    state: {
      clientId,
    },
  };
};

export const getConsultantDetailsView = (consultantId, consultantEmailStatus) => {
  return {
    pathname: RoutesPaths.Admin.ConsultantDetailsView,
    state: {
      consultantId,
      consultantEmailStatus
    },
  };
};
export const getConsultantVerificationList = () => {
  return {
    pathname: RoutesPaths.Admin.ConsultantVerificationsList,
  };
};
export const getProjectConsultantsList = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.ProjectConsultants,
    state: {
      projectId,
    },
  };
};
export const getProjectBeneficiariesList = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.ProjectBeneficiaries,
    state: {
      projectId,
    },
  };
};

export const getProjectSettingsWizard = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddProjectSettings,
    state: {
      projectId,
      isWizardEnabled: true,
    },
  };
};

export const getConsultantsProjectWizard = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddConsutlantsToProjectWizard,
    state: {
      projectId,
    },
  };
};

export const getBeneficiariesProjectWizard = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddBeneficiariesToProjectWizard,
    state: {
      projectId,
    },
  };
};

export const getAddConsultantsToProjectPath = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddConsultantsToProject,
    state: {
      projectId,
    },
  };
};

export const getAddBeneficiariesToProjectPath = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddBeneficiariesToProject,
    state: {
      projectId,
    },
  };
};

export const getEditProjectPath = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.AddProject,
    state: {
      projectId,
    },
  };
};

export const getProjectDetails = (projectId) => {
  return {
    pathname: RoutesPaths.Admin.ProjectDetails,
    state: {
      projectId,
    },
  };
};
export const getAccountDetails = (accountId) => {
  return {
    pathname: RoutesPaths.App.AccountDetails,
    state: {
      accountId,
    },
  };
};

export const getConsultantDetails = (consultantId) => {
  return {
    pathname: RoutesPaths.Admin.ConsultantsDetails,
    state: {
      consultantId: consultantId,
    },
  };
};

export const getAdminProfile = () => {
  return {
    pathname: RoutesPaths.Admin.AdminProfile,
  };
};

export const getChangePassword = () => {
  return {
    pathname: RoutesPaths.Admin.ChangePassword,
  };
};
