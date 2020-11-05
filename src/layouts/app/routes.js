// @material-ui/icons

import { RoutesPaths } from 'constants/routesPath';

// core components/views for AdminLayout layout
import QuestionRoaster from 'pages/App/QuestionRoaster/QuestionRoasterView';
import HomePage from 'pages/App/Home';
import AnswerQuestion from 'pages/App/QuestionRoaster/AnswerQuestion';
import EditProfile from 'pages/App/Profile/Profile';
import MeetingsPage from 'pages/App/Meeting';
import MeetingDetailsPage from 'pages/App/Meeting/MeetingDetailsPage';
import PostSubmissionNote from 'pages/App/QuestionRoaster/PostSubmissionNote';
import AllNotifications from 'pages/Admin/Dashboard/AllNotifications';


const appRoutes = [
  {
    path: RoutesPaths.App.Home,
    component: HomePage,
  },
  {
    path: RoutesPaths.App.Questions,
    component: QuestionRoaster,
  },
  {
    path: RoutesPaths.App.AnswerQuestion,
    component: AnswerQuestion,
  },
  {
    path: RoutesPaths.App.EditProfile,
    component: EditProfile,
  },
  {
    path: RoutesPaths.App.Meetings,
    component: MeetingsPage,
  },
  {
    path: RoutesPaths.App.MeetingDetails,
    component: MeetingDetailsPage,
  },
  {
    path: RoutesPaths.App.SubmitAnswerNote,
    component: PostSubmissionNote,
  },
  {
    path: RoutesPaths.App.AllNotifications,
    component: AllNotifications,
  },
];

export default appRoutes;
