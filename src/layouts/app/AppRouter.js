import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';

import HomePage from 'pages/App/Home';
import QuestionRoaster from 'pages/App/QuestionRoaster/QuestionRoasterView';
import AnswerQuestion from 'pages/App/QuestionRoaster/AnswerQuestion';
import EditProfile from 'pages/App/Profile/Profile';
import MeetingsPage from 'pages/App/Meeting';
import MeetingDetailsPage from 'pages/App/Meeting/MeetingDetailsPage';
import { RoutesPaths } from 'constants/routesPath';
import PostSubmissionNote from '../../pages/App/QuestionRoaster/PostSubmissionNote';
import AllNotifications from '../../pages/Admin/Dashboard/AllNotifications';

const AppRouter = () => {
  return <Switch>
    <PrivateRoute
      exact
      path={RoutesPaths.App.Home}
      component={HomePage}/>
    <PrivateRoute
      path={RoutesPaths.App.Questions}
      component={QuestionRoaster}/>
    <PrivateRoute
      path={RoutesPaths.App.AnswerQuestion}
      component={AnswerQuestion}/>
    <PrivateRoute
      path={RoutesPaths.App.EditProfile}
      component={EditProfile}/>
    <PrivateRoute
      path={RoutesPaths.App.Meetings}
      component={MeetingsPage}/>
    <PrivateRoute
      path={RoutesPaths.App.MeetingDetails}
      component={MeetingDetailsPage}
    />
    <PrivateRoute
      path={RoutesPaths.App.SubmitAnswerNote}
      component={PostSubmissionNote}/>
    <PrivateRoute
      path={RoutesPaths.App.AllNotifications}
      component={AllNotifications}/>
  </Switch>;
};


export default AppRouter;
