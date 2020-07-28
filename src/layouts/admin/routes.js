/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import { RoutesPaths } from 'constants/routesPath';

// core components/views for AdminLayout layout
import QuestionList from 'pages/Admin/Questions/list/QuestionList';
import Dashboard from 'pages/Admin/Dashboard/Dashboard';
import Logout from 'pages/auth/LogoutUser';
import QuestionDetails from 'pages/Admin/Questions/details/QuestionsDetails';

const adminRoutes = [
  {
    path: RoutesPaths.Admin.Dashboard,
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.Questions,
    name: 'Questions',
    icon: QuestionAnswerIcon,
    component: QuestionList,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.QuestionsDetails,
    name: 'Questions Details',
    component: QuestionDetails,
    hasDashboardLink: false,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.User,
    name: 'Freelancers',
    icon: Person,
    component: Dashboard,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.Icons,
    name: 'Clients',
    icon: BubbleChart,
    component: Dashboard,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.Typography,
    name: 'Meetings',
    icon: LibraryBooks,
    component: Dashboard,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.Notifications,
    name: 'Calls',
    icon: Notifications,
    component: Dashboard,
    hasDashboardLink: true,
    layout: '/admin',
  },
  {
    path: RoutesPaths.Admin.Logout,
    name: 'Logout',
    icon: Unarchive,
    component: Logout,
    hasDashboardLink: false,
    layout: '/admin',
  },
];

export default adminRoutes;
