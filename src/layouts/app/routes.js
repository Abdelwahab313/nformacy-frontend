import DashboardIcon from '@material-ui/icons/Dashboard';
import { VpnKey } from '@material-ui/icons';

import UserTypeSelection from 'pages/App/register/UserTypeSelection';
import LandingPage from 'pages/App/LandingPage/LandingPage';
import Login from 'pages/auth/LoginUser';
import Register from 'pages/Register/Register';
import FreeLancerProfileForm from 'pages/App/FreelancerProfile/FreelancerProfileForm';
import Logout from 'pages/auth/LogoutUser';
import QuestionRoaster from 'pages/App/QuestionRoaster/QuestionRoasterView';
import HomePage from 'pages/App/Home';
import AnswerQuestion from 'pages/App/FreelancersAnswers/edit';
import EditServiceRequest from 'pages/App/ServiceRequests/edit';
import EditProfile from 'pages/App/Profile/Profile';
import AllNotifications from 'pages/Admin/Dashboard/AllNotifications';
import ServicesPage from 'pages/App/ServiceRequests/list';
import ServiceDetails from 'pages/App/ServiceRequests/details';
import FreelancersActivitiesPage from 'pages/App/FreelancersAnswers/list';
import CallEvaluationPage from 'pages/App/MeetingEvaluation/CallEvaluation';
import { RoutesPaths } from 'constants/routesPath';
import NotFoundPage from 'pages/NotFoundPage';
import ContactUsPage from 'pages/App/ContactUs/ContactUsPage';
import SolutionsPage from 'pages/App/Solutions/SolutionsPage';
import TermsAndConditionsPage from 'pages/App/TermsAndConditions/TermsAndConditionsPage';
import AboutPage from 'pages/App/about/AboutPage';
import ConsultantsPage from 'pages/App/Consultants/ConsultantsPage';
import CorporateAccountsList from 'pages/App/Accounts/list/CorporateAccountsList';
import CorporateAccountDetails from 'pages/App/Accounts/details/CorporateAccountDetails';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import KnowHubPage from 'pages/App/LandingPage/KnowHub';
import ChangePasswordPage from 'pages/ChangePassword';
import AddAccount from 'pages/App/Accounts/add/AddAccount';
import WelcomeAccountPage from 'pages/App/WelcomeAccount';
import VerifyEmail from 'pages/App/EmailVerification/VerifyEmail';
import EmailVerificationPending from 'pages/App/EmailVerification/EmailVerificationPending';

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
    Component: WelcomeAccountPage,
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
    path: RoutesPaths.App.FreelancerProfile,
    name: 'Profile',
    icon: DashboardIcon,
    Component: FreeLancerProfileForm,
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
    path: RoutesPaths.App.Services,
    name: 'Services',
    icon: DashboardIcon,
    Component: ServicesPage,
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
    path: RoutesPaths.App.ActivitiesList,
    name: 'Activities List',
    icon: DashboardIcon,
    Component: FreelancersActivitiesPage,
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
    path: RoutesPaths.App.EmailVerificationPending,
    name: 'Check Email Verification',
    icon: DashboardIcon,
    Component: EmailVerificationPending,
    includeLayout: true,
    isPublic: false,
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
