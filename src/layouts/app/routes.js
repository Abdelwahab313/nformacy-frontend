// @material-ui/icons

import { RoutesPaths } from 'constants/routesPath';

// core components/views for AdminLayout layout
import QuestionRoaster from 'pages/App/QuestionRoaster/QuestionRoasterView';
import HomePage from 'pages/App/Home';
import AnswerQuestion from 'pages/App/QuestionRoaster/AnswerQuestion';
import ServiceRequestDetails from 'pages/App/ServiceRequests/details';
import EditProfile from 'pages/App/Profile/Profile';
import MeetingsPage from 'pages/App/Meeting';
import MeetingDetailsPage from 'pages/App/Meeting/MeetingDetailsPage';
import PostSubmissionNote from 'pages/App/QuestionRoaster/PostSubmissionNote';
import AllNotifications from 'pages/Admin/Dashboard/AllNotifications';
import ServicesPage from 'pages/App/ServiceRequests/list';
import QuestionDetails from 'pages/App/Questions/details';

const appRoutes = [
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
    path: RoutesPaths.App.QuestionsDetails,
    component: QuestionDetails,
    exact: true,
  },
  {
    path: RoutesPaths.App.AnswerQuestion,
    component: AnswerQuestion,
    exact: false,
  },
  {
    path: RoutesPaths.App.ServiceRequestDetails,
    component: ServiceRequestDetails,
    exact: true,
  },
  {
    path: RoutesPaths.App.Services,
    component: ServicesPage,
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
    path: RoutesPaths.App.MeetingDetails,
    component: MeetingDetailsPage,
    exact: true,
  },
  {
    path: RoutesPaths.App.SubmitAnswerNote,
    component: PostSubmissionNote,
    exact: true,
  },
  {
    path: RoutesPaths.App.AllNotifications,
    component: AllNotifications,
    exact: true,
  },
];

export default appRoutes;
