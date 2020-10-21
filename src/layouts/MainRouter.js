import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesPaths } from 'constants/routesPath';
import Login from 'pages/auth/LoginUser';
import Register from 'pages/Register/Register';
import Logout from 'pages/auth/LogoutUser';
import PrivateRoute from 'components/PrivateRoute';
import AdminLayout from 'layouts/admin/AdminLayout';
import FreeLancerProfileForm from 'pages/FreelancerProfile/FreelancerProfileForm';
import Success from 'pages/FreelancerProfile/success';
import Layout from 'layouts/app/AppLayout';

const MainRouter = () => {
  return (
    <Switch>
      <Route path={RoutesPaths.App.Login} component={Login} />
      <Route path={RoutesPaths.App.Signup} component={Register} />
      <Route path={RoutesPaths.App.Logout} component={Logout} />
      <Route path={RoutesPaths.Admin.Login} component={Login} />
      <PrivateRoute path={RoutesPaths.Admin.Home} component={AdminLayout} />
      <PrivateRoute
        path={RoutesPaths.App.FreelancerProfile}
        component={FreeLancerProfileForm}
      />
      <PrivateRoute
        path={RoutesPaths.App.FreelancerSuccess}
        component={Success}
      />
      <PrivateRoute path={RoutesPaths.App.Home} component={Layout} />
    </Switch>
  );
};

export default MainRouter;
