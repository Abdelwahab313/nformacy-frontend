// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
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
import Evaluations from 'pages/Admin/Evaluations';
import AdminsList from 'pages/Admin/Admins/list';
import AddAdmin from 'pages/Admin/Admins/list/AddAdmin';
import AdvisorsList from 'pages/Admin/Advisors';
import AddAdvisor from 'pages/Admin/Advisors/AddAdvisor';
import AdminDetails from 'pages/Admin/Admins/edit/subComponents/AdminDetails';
import AdvisersDetails from 'pages/Admin/Advisors/edit/subComponent/AdviserDetails';
import ClientsList from 'pages/Admin/Clients/list';
import ConsultantsList from 'pages/Admin/Consultants/list';
import AdminGuardian from 'core/guardians/AdminGuardian';
import ClientsDetailsInfo from 'pages/Admin/Clients/edit/subComponents.js/ClientsDetailsInfo';
import ClientDetailsView from 'pages/Admin/Clients/edit/subComponents.js/ClientDetailsView';
import { CalendarTodayOutlined } from '@material-ui/icons';
import AdminCalendarDetails from 'pages/Admin/Calendar';
import ConsultantDetails from 'pages/Admin/Consultants/edit/subComponents/ConsultantDetails';
import AdminProfile from 'pages/Admin/Admins/edit/subComponents/AdminProfile';
import ChangePasswordPage from 'pages/ChangePassword';
import ClientDetails from 'pages/Admin/Clients/edit/subComponents.js/ClientDetails';

const adminRoutes = [
  {
    path: RoutesPaths.Admin.Dashboard,
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.Questions,
    name: 'Questions',
    icon: QuestionAnswerIcon,
    component: QuestionList,
    hasDashboardLink: AdminGuardian.showQuestionsPanel(),
  },
  {
    path: RoutesPaths.Admin.Consultants,
    name: 'Consultants',
    icon: Person,
    component: ConsultantsList,
    hasDashboardLink: AdminGuardian.showConsultantsPanel(),
  },
  {
    path: RoutesPaths.Admin.Clients,
    name: 'Clients',
    icon: BubbleChart,
    component: ClientsList,
    hasDashboardLink: AdminGuardian.showClientsPanel(),
  },
  {
    path: RoutesPaths.Admin.ClientsDetails,
    name: 'Client Details',
    icon: BusinessCenterIcon,
    component: ClientsDetailsInfo,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.ClientDetailsView,
    name: 'Client View',
    icon: BusinessCenterIcon,
    component: ClientDetailsView,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.ClientDetails,
    name: 'Client Details',
    icon: BusinessCenterIcon,
    component: ClientDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.ConsultantsDetails,
    name: 'Consultant Details',
    icon: BusinessCenterIcon,
    component: ConsultantDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.Services,
    name: 'Services',
    icon: BusinessCenterIcon,
    component: ServicesList,
    hasDashboardLink: AdminGuardian.showRequestsPanel(),
  },
  {
    path: RoutesPaths.Admin.Admins,
    name: 'Admins',
    icon: PeopleIcon,
    component: AdminsList,
    hasDashboardLink: AdminGuardian.isSuperAdmin(),
  },
  {
    path: RoutesPaths.Admin.Advisors,
    name: 'Advisors',
    icon: PeopleIcon,
    component: AdvisorsList,
    hasDashboardLink: AdminGuardian.showAdvisersPanel(),
  },
  {
    path: RoutesPaths.Admin.Calendar,
    name: 'Calendar',
    icon: CalendarTodayOutlined,
    component: AdminCalendarDetails,
    hasDashboardLink: true,
  },
  {
    path: RoutesPaths.Admin.Notifications,
    name: 'Notifications',
    icon: Notifications,
    component: AllNotifications,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.PostQuestion,
    name: 'Post Question',
    icon: QuestionAnswerIcon,
    component: QuestionDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.Evaluations,
    name: 'View Evaluations',
    component: Evaluations,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.ChangePassword,
    name: 'Change Password',
    component: ChangePasswordPage,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.QuestionsDetails,
    name: 'Questions Details',
    component: QuestionDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.AddAdmin,
    name: 'Add Admin',
    icon: BusinessCenterIcon,
    component: AddAdmin,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.AdminDetails,
    name: 'Admin Details',
    icon: BusinessCenterIcon,
    component: AdminDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.AdminProfile,
    name: 'Admin Profile',
    icon: BusinessCenterIcon,
    component: AdminProfile,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.AdvisersDetails,
    name: 'Adviser Details',
    icon: BusinessCenterIcon,
    component: AdvisersDetails,
    hasDashboardLink: false,
  },
  {
    path: RoutesPaths.Admin.AddAdvisor,
    name: 'Add Advisor',
    icon: BusinessCenterIcon,
    component: AddAdvisor,
    hasDashboardLink: false,
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
