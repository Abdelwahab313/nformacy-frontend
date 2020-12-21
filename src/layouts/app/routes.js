// @material-ui/icons

import { RoutesPaths } from 'constants/routesPath';

// core components/views for AdminLayout layout
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
import UserTypeSelection from 'pages/App/register/UserTypeSelection';
import LandingPage from 'pages/App/LandingPage/LandingPage';

const appRoutes = [
  {
    path: RoutesPaths.App.LandingPage,
    component: LandingPage,
    exact: true,
  },
  {
    path: RoutesPaths.App.Home,
    component: HomePage,
    exact: true,
  },
  {
    path: RoutesPaths.App.Questions,
    component: QuestionRoaster,
    exact: true,
  },
  {
    path: RoutesPaths.App.ServiceDetails,
    component: ServiceDetails,
    exact: true,
  },
  {
    path: RoutesPaths.App.AnswerQuestion,
    component: AnswerQuestion,
    exact: false,
  },
  {
    path: RoutesPaths.App.EditServiceRequest,
    component: EditServiceRequest,
    exact: true,
  },
  {
    path: RoutesPaths.App.Services,
    component: ServicesPage,
    exact: true,
  },
  {
    path: RoutesPaths.App.AnswersList,
    component: FreelancersAnswersPage,
    exact: true,
  },
  {
    path: RoutesPaths.App.EditProfile,
    component: EditProfile,
    exact: true,
  },
  {
    path: RoutesPaths.App.Meetings,
    component: MeetingsPage,
    exact: true,
  },
  {
    path: RoutesPaths.App.AllNotifications,
    component: AllNotifications,
    exact: true,
  },
  {
    path: RoutesPaths.App.UserTypeSelection,
    component: UserTypeSelection,
    exact: true,
  },
];

export default appRoutes;
