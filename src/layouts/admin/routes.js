// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import { RoutesPaths } from 'constants/routesPath';

// core components/views for AdminLayout layout
import QuestionList from 'pages/Admin/Questions/list/QuestionList';
import Dashboard from 'pages/Admin/Dashboard/Dashboard';
import AllNotifications from 'pages/Admin/Dashboard/AllNotifications';
import Logout from 'pages/auth/LogoutUser';
import QuestionDetails from 'pages/Admin/Questions/QuestionDetails';
import ServicesList from 'pages/Admin/ServicesRequests/list';
import ServiceDetails from 'pages/Admin/ServicesRequests/details';
import authManager from 'services/authManager';

const adminRoutes = [
  {
    path: RoutesPaths.Admin.Dashboard,
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Questions,
    name: 'Questions',
    icon: QuestionAnswerIcon,
    component: QuestionList,
    hasDashboardLink: authManager.isAdviser(),
  },
  {
    path: RoutesPaths.Admin.PostQuestion,
    name: 'Post Question',
    icon: QuestionAnswerIcon,
    component: QuestionDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.QuestionsDetails,
    name: 'Questions Details',
    component: QuestionDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.User,
    name: 'Freelancers',
    icon: Person,
    component: Dashboard,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Icons,
    name: 'Clients',
    icon: BubbleChart,
    component: Dashboard,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Typography,
    name: 'Meetings',
    icon: LibraryBooks,
    component: Dashboard,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Notifications,
    name: 'Notifications',
    icon: Notifications,
    component: AllNotifications,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Services,
    name: 'Services',
    icon: BusinessCenterIcon,
    component: ServicesList,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.ServiceDetails,
    name: 'Service Details',
    component: ServiceDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.Logout,
    name: 'Logout',
    icon: Unarchive,
    component: Logout,
    hasDashboardLink: false,
  },
];

export default adminRoutes;
