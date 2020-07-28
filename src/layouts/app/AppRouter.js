import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';

import HomePage from 'pages/Home';
import QuestionRoasterView from 'pages/QuestionRoaster/QuestionRoasterView';
import AnswerQuestion from 'pages/QuestionRoaster/AnswerQuestion';
import EditProfile from 'pages/Profile/Profile';
import MeetingsPage from 'pages/Meeting';
import MeetingDetailsPage from 'pages/Meeting/MeetingDetailsPage';
import { RoutesPaths } from 'constants/routesPath';

const AppRouter = () => {
  return <Switch>
    <PrivateRoute
      exact
      path={RoutesPaths.App.Home}
      component={HomePage}/>
    <PrivateRoute
      path={RoutesPaths.App.Questions}
      component={QuestionRoasterView}/>
    <PrivateRoute
      path={RoutesPaths.App.AnswerQuestion}
      component={AnswerQuestion}/>
    <PrivateRoute
      path={RoutesPaths.App.EditProfile}
      component={EditProfile}/>
    <PrivateRoute
      exact path={RoutesPaths.App.Meetings}
      component={MeetingsPage}/>
    <PrivateRoute
      exact
      path={RoutesPaths.App.MeetingDetails}
      component={MeetingDetailsPage}
    />
  </Switch>;
};


export default AppRouter;
