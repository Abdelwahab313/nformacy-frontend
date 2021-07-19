import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { VpnKey } from '@material-ui/icons';
import { RoutesPaths } from 'constants/routesPath';
import ConsultantFullRegistrationForm from 'pages/App/FreelancerProfile/ConsultantFullRegistrationForm';

const ProjectDetails = React.lazy(() => import('pages/App/Projects/details'));

const UserTypeSelection = React.lazy(() =>
  import('pages/App/register/UserTypeSelection'),
);
const LandingPage = React.lazy(() =>
  import('pages/App/LandingPage/LandingPage'),
);
const Login = React.lazy(() => import('pages/auth/LoginUser'));
const Register = React.lazy(() => import('pages/Register/Register'));
const UserRegistrationForm = React.lazy(() =>
  import('pages/App/FreelancerProfile/UserRegistrationForm'),
);
const ConsultantAdvancedRegistrationForm = React.lazy(() =>
  import('pages/App/FreelancerProfile/ConsultantAdvancedRegistrationForm'),
);
const Logout = React.lazy(() => import('pages/auth/LogoutUser'));
const QuestionRoaster = React.lazy(() =>
  import('pages/App/QuestionRoaster/QuestionRoasterView'),
);
const HomePage = React.lazy(() => import('pages/App/Home'));
const AnswerQuestion = React.lazy(() =>
  import('pages/App/FreelancersAnswers/edit'),
);
const EditServiceRequest = React.lazy(() =>
  import('pages/App/ServiceRequests/edit'),
);
const NewQuestion = React.lazy(() =>
  import('pages/App/ServiceRequests/newQuestion'),
);
const EditProfile = React.lazy(() => import('pages/App/Profile/Profile'));
const AllNotifications = React.lazy(() =>
  import('pages/Admin/Dashboard/AllNotifications'),
);
const ServicesPage = React.lazy(() => import('pages/App/ServiceRequests/list'));
const ServiceDetails = React.lazy(() =>
  import('pages/App/ServiceRequests/details'),
);
const FreelancersActivitiesPage = React.lazy(() =>
  import('pages/App/FreelancersAnswers/list'),
);
const FreelancersActivitiesFullView = React.lazy(() =>
  import('pages/App/FreelancersAnswers/list/FreelancersActivitiesFullView'),
);
const CorporateActivitiesFullView = React.lazy(() =>
  import('pages/App/Home/subComponents/CorporateActivitiesFullView'),
);
const CallEvaluationPage = React.lazy(() =>
  import('pages/App/MeetingEvaluation/CallEvaluation'),
);
const MeetingWithAdminScheduler = React.lazy(() =>
  import('pages/App/MeetingWithAdminScheduler'),
);
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const ContactUsPage = React.lazy(() =>
  import('pages/App/ContactUs/ContactUsPage'),
);
const SolutionsPage = React.lazy(() =>
  import('pages/App/Solutions/SolutionsPage'),
);
const TermsAndConditionsPage = React.lazy(() =>
  import('pages/App/TermsAndConditions/TermsAndConditionsPage'),
);
const AboutPage = React.lazy(() => import('pages/App/about/AboutPage'));
const ConsultantsPage = React.lazy(() =>
  import('pages/App/Consultants/ConsultantsPage'),
);
const CorporateAccountsList = React.lazy(() =>
  import('pages/App/Accounts/list/CorporateAccountsList'),
);
const CorporateAccountDetails = React.lazy(() =>
  import('pages/App/Accounts/details/CorporateAccountDetails'),
);
const ForgetPassword = React.lazy(() => import('pages/ForgetPassword'));
const ResetPassword = React.lazy(() => import('pages/ResetPassword'));
const KnowHubPage = React.lazy(() => import('pages/App/LandingPage/KnowHub'));
const Nformacy360 = React.lazy(() =>
  import('pages/App/LandingPage/Nformacy360'),
);
const ChangePasswordPage = React.lazy(() => import('pages/ChangePassword'));
const AddAccount = React.lazy(() =>
  import('pages/App/Accounts/add/AddAccount'),
);
const OauthSuccess = React.lazy(() => import('pages/auth/OauthSuccess'));
const VerifyEmail = React.lazy(() =>
  import('pages/App/EmailVerification/VerifyEmail'),
);
const EmailVerificationPending = React.lazy(() =>
  import('pages/App/EmailVerification/EmailVerificationPending'),
);
const Pointing = React.lazy(() => import('pages/App/Pointing'));
const WelcomeAccountFormPage = React.lazy(() =>
  import('pages/App/WelcomeAccount'),
);
const JitsiCall = React.lazy(() => import('pages/App/Calls/JitsiCall'));

const appRoutes = [
  {
    path: RoutesPaths.App.LandingPage,
    name: 'Home',
    icon: DashboardIcon,
    Component: LandingPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.About,
    name: 'About',
    icon: DashboardIcon,
    Component: AboutPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.Solutions,
    name: 'Solutions',
    icon: DashboardIcon,
    Component: SolutionsPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.Consultants,
    name: 'Experts',
    icon: DashboardIcon,
    Component: ConsultantsPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.ContactUs,
    name: 'Connect',
    icon: DashboardIcon,
    Component: ContactUsPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.TermsAndConditions,
    name: 'Terms And Conditions',
    icon: DashboardIcon,
    Component: TermsAndConditionsPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.KnowHub,
    name: 'Knowledge Hub',
    icon: DashboardIcon,
    Component: KnowHubPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.Nformacy360,
    name: 'KnowHub',
    icon: DashboardIcon,
    Component: Nformacy360,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.Login,
    name: 'Login',
    icon: DashboardIcon,
    Component: Login,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.Signup,
    name: 'Sign up',
    icon: DashboardIcon,
    Component: Register,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ForgetPassword,
    name: 'Forget password',
    icon: DashboardIcon,
    Component: ForgetPassword,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ResetPassword,
    name: 'Reset password',
    icon: DashboardIcon,
    Component: ResetPassword,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ChangePassword,
    name: 'Change Password',
    icon: VpnKey,
    Component: ChangePasswordPage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.WelcomeAccount,
    name: 'Welcome',
    icon: DashboardIcon,
    Component: WelcomeAccountFormPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.UserTypeSelection,
    name: 'User type',
    icon: DashboardIcon,
    Component: UserTypeSelection,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.UserRegistrationForm,
    name: 'Profile',
    icon: DashboardIcon,
    Component: UserRegistrationForm,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ConsultantAdvancedRegistrationForm,
    name: 'Profile',
    icon: DashboardIcon,
    Component: ConsultantAdvancedRegistrationForm,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ConsultantFullRegistrationForm,
    name: 'Full Profile',
    icon: DashboardIcon,
    Component: ConsultantFullRegistrationForm,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.Dashboard,
    name: 'Dashboard',
    icon: DashboardIcon,
    Component: HomePage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.Questions,
    name: 'Questions',
    icon: DashboardIcon,
    Component: QuestionRoaster,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.ServiceDetails,
    name: 'Service Details',
    icon: DashboardIcon,
    Component: ServiceDetails,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.CallEvaluation,
    name: 'Call Evaluation',
    icon: DashboardIcon,
    Component: CallEvaluationPage,
    includeLayout: true,
    public: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.MeetingWithAdmin,
    name: 'Meeting with Admin',
    icon: DashboardIcon,
    Component: MeetingWithAdminScheduler,
    includeLayout: true,
    public: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.AnswerQuestion,
    name: 'Answer Question',
    icon: DashboardIcon,
    Component: AnswerQuestion,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.EditServiceRequest,
    name: 'Edit Service Request',
    icon: DashboardIcon,
    Component: EditServiceRequest,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.NewQuestion,
    name: 'Edit Question',
    icon: DashboardIcon,
    Component: NewQuestion,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.Services,
    name: 'Services',
    icon: DashboardIcon,
    Component: ServicesPage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.ProjectDetails,
    name: 'Project Details',
    icon: DashboardIcon,
    Component: ProjectDetails,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.Accounts,
    name: 'Accounts',
    icon: DashboardIcon,
    Component: CorporateAccountsList,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.AccountDetails,
    name: 'Account Details',
    icon: DashboardIcon,
    Component: CorporateAccountDetails,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.AddAccount,
    name: 'Add Account',
    icon: DashboardIcon,
    Component: AddAccount,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.Pointing,
    name: 'Pointing',
    icon: DashboardIcon,
    Component: Pointing,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ActivitiesList,
    name: 'Activities List',
    icon: DashboardIcon,
    Component: FreelancersActivitiesPage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.ConsultantActivitiesList,
    name: 'Consultant Activities List',
    icon: DashboardIcon,
    Component: FreelancersActivitiesFullView,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.CorporateActivitiesList,
    name: 'Corporate Activities List',
    icon: DashboardIcon,
    Component: CorporateActivitiesFullView,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.EditProfile,
    name: 'Edit Profile',
    icon: DashboardIcon,
    Component: EditProfile,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },

  {
    path: RoutesPaths.App.AllNotifications,
    name: 'Notifications',
    icon: DashboardIcon,
    Component: AllNotifications,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.EmailVerificationCallback,
    name: 'Verify Email',
    icon: DashboardIcon,
    Component: VerifyEmail,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.OauthSuccess,
    name: 'Oauth success',
    icon: DashboardIcon,
    Component: OauthSuccess,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.EmailVerificationPending,
    name: 'Check Email Verification',
    icon: DashboardIcon,
    Component: EmailVerificationPending,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.JitsiCall,
    name: 'Jitsi Meeting',
    icon: DashboardIcon,
    Component: JitsiCall,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.NotFound,
    name: 'Not Found',
    icon: DashboardIcon,
    Component: NotFoundPage,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.Logout,
    name: 'Log out',
    icon: DashboardIcon,
    Component: Logout,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: true,
  },
];

export default appRoutes;
