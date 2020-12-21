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
import FreelancersAnswersPage from 'pages/App/FreelancersAnswers/list';
import { RoutesPaths } from 'constants/routesPath';
import NotFoundPage from 'pages/NotFoundPage';

const appRoutes = [
  {
    path: RoutesPaths.App.LandingPage,
    component: LandingPage,
    includeLayout: false,
    public: true,
  },
  {
    path: RoutesPaths.App.Login,
    component: Login,
    includeLayout: false,
    public: true,
  },
  {
    path: RoutesPaths.App.Signup,
    component: Register,
    includeLayout: false,
    public: true,
  },
  {
    path: RoutesPaths.App.Logout,
    component: Logout,
    includeLayout: false,
    public: true,
  },
  {
    path: RoutesPaths.App.UserTypeSelection,
    component: UserTypeSelection,
    includeLayout: false,
    public: false,
  },
  {
    path: RoutesPaths.App.FreelancerProfile,
    component: FreeLancerProfileForm,
    includeLayout: false,
    public: false,
  },
  {
    path: RoutesPaths.App.FreelancerSuccess,
    component: Success,
    includeLayout: false,
    public: false,
  },
  {
    path: RoutesPaths.App.LandingPage,
    component: LandingPage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.Dashboard,
    component: HomePage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.Questions,
    component: QuestionRoaster,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.ServiceDetails,
    component: ServiceDetails,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.AnswerQuestion,
    component: AnswerQuestion,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.EditServiceRequest,
    component: EditServiceRequest,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.Services,
    component: ServicesPage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.AnswersList,
    component: FreelancersAnswersPage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.EditProfile,
    component: EditProfile,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.Meetings,
    component: MeetingsPage,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.AllNotifications,
    component: AllNotifications,
    includeLayout: true,
    public: false,
  },

  {
    path: RoutesPaths.App.UserTypeSelection,
    component: UserTypeSelection,
    includeLayout: true,
    public: false,
  },
  {
    path: RoutesPaths.App.NotFound,
    component: NotFoundPage,
    includeLayout: false,
    public: true,
  },
];

export default appRoutes;
