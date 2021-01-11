import DashboardIcon from '@material-ui/icons/Dashboard';

import UserTypeSelection from 'pages/App/register/UserTypeSelection';
import LandingPage from 'pages/App/LandingPage/LandingPage';
import Login from 'pages/auth/LoginUser';
import Register from 'pages/Register/Register';
import FreeLancerProfileForm from 'pages/App/FreelancerProfile/FreelancerProfileForm';
import Success from 'pages/App/FreelancerProfile/success';
import Logout from 'pages/auth/LogoutUser';
import QuestionRoaster from 'pages/App/QuestionRoaster/QuestionRoasterView';
import HomePage from 'pages/App/Home';
import AnswerQuestion from 'pages/App/FreelancersAnswers/edit';
import EditServiceRequest from 'pages/App/ServiceRequests/edit';
import EditProfile from 'pages/App/Profile/Profile';
import MeetingsPage from 'pages/App/Meeting';
import AllNotifications from 'pages/Admin/Dashboard/AllNotifications';
import ServicesPage from 'pages/App/ServiceRequests/list';
import ServiceDetails from 'pages/App/ServiceRequests/details';
import FreelancersActivitiesPage from 'pages/App/FreelancersAnswers/list';
import CallEvaluationPage from 'pages/App/MeetingEvaluation/CallEvaluation';
import { RoutesPaths } from 'constants/routesPath';
import NotFoundPage from 'pages/NotFoundPage';
import ContactUsPage from 'pages/App/ContactUs/ContactUsPage';
import FreelancerAnswersDetails from 'pages/App/FreelancersAnswers/edit/FrelancerAnswersDetails';

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
    path: RoutesPaths.App.ContactUs,
    name: 'Contact us',
    icon: DashboardIcon,
    Component: ContactUsPage,
    includeLayout: true,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.Login,
    name: 'Login',
    icon: DashboardIcon,
    Component: Login,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.Signup,
    name: 'Sign up',
    icon: DashboardIcon,
    Component: Register,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: true,
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
  {
    path: RoutesPaths.App.UserTypeSelection,
    name: 'User type',
    icon: DashboardIcon,
    Component: UserTypeSelection,
    includeLayout: false,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.FreelancerProfile,
    name: 'Profile',
    icon: DashboardIcon,
    Component: FreeLancerProfileForm,
    includeLayout: false,
    isPublic: false,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.App.FreelancerSuccess,
    name: 'success',
    icon: DashboardIcon,
    Component: Success,
    includeLayout: false,
    isPublic: false,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.App.LandingPage,
    name: 'Home',
    icon: DashboardIcon,
    Component: LandingPage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: true,
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
    hasDashboardLink: true,
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
    hasDashboardLink: true,
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
    path: RoutesPaths.App.Meetings,
    name: 'Meetings',
    icon: DashboardIcon,
    Component: MeetingsPage,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: true,
  },

  {
    path: RoutesPaths.App.AllNotifications,
    name: 'Notifications',
    icon: DashboardIcon,
    Component: AllNotifications,
    includeLayout: true,
    isPublic: false,
    hasDashboardLink: true,
  },

  {
    path: RoutesPaths.App.UserTypeSelection,
    name: 'User Type',
    icon: DashboardIcon,
    Component: UserTypeSelection,
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
    path: RoutesPaths.App.FreelancerAnswersDetails,
    name: 'Answers Details',
    icon: DashboardIcon,
    Component: FreelancerAnswersDetails,
    includeLayout: false,
    isPublic: true,
    hasDashboardLink: false,
  },
];

export default appRoutes;
