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

const appRoutes = [
  {
    path: RoutesPaths.App.LandingPage,
    Component: LandingPage,
    includeLayout: true,
    isPublic: true,
  },
  {
    path: RoutesPaths.App.ContactUs,
    Component: ContactUsPage,
    includeLayout: true,
    isPublic: true,
  },
  {
    path: RoutesPaths.App.Login,
    Component: Login,
    includeLayout: false,
    isPublic: true,
  },
  {
    path: RoutesPaths.App.Signup,
    Component: Register,
    includeLayout: false,
    isPublic: true,
  },
  {
    path: RoutesPaths.App.Logout,
    Component: Logout,
    includeLayout: false,
    isPublic: true,
  },
  {
    path: RoutesPaths.App.UserTypeSelection,
    Component: UserTypeSelection,
    includeLayout: false,
    isPublic: false,
  },
  {
    path: RoutesPaths.App.FreelancerProfile,
    Component: FreeLancerProfileForm,
    includeLayout: false,
    isPublic: false,
  },
  {
    path: RoutesPaths.App.FreelancerSuccess,
    Component: Success,
    includeLayout: false,
    isPublic: false,
  },
  {
    path: RoutesPaths.App.LandingPage,
    Component: LandingPage,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.Dashboard,
    Component: HomePage,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.Questions,
    Component: QuestionRoaster,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.ServiceDetails,
    Component: ServiceDetails,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.CallEvaluation,
    Component: CallEvaluationPage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.AnswerQuestion,
    Component: AnswerQuestion,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.EditServiceRequest,
    Component: EditServiceRequest,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.Services,
    Component: ServicesPage,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.ActivitiesList,
    Component: FreelancersActivitiesPage,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.EditProfile,
    Component: EditProfile,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.Meetings,
    Component: MeetingsPage,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.AllNotifications,
    Component: AllNotifications,
    includeLayout: true,
    isPublic: false,
  },

  {
    path: RoutesPaths.App.UserTypeSelection,
    Component: UserTypeSelection,
    includeLayout: true,
    isPublic: false,
  },
  {
    path: RoutesPaths.App.NotFound,
    Component: NotFoundPage,
    includeLayout: false,
    isPublic: true,
  },
];

export default appRoutes;
