import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProjectConsultantsList from './list/ProjectConsultantsList';
import ProjectBeneficiariesList from './list/ProjectBeneficiariesList';
import LoadingCircle from 'components/progress/LoadingCircle';
import AdminServicesTable from 'templates/services/AdminServicesTable';
import useFetchData from 'hooks/useFetchData';
import { fetchServices } from 'apis/servicesAPI';
import ProjectDetailsView from './ProjectDetailsView';
import { fetchProjectDetails } from 'apis/projectsAPI';
import AddProjectServiceForm from './AddProjectServiceForm';
import MentoringList from './MentoringList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ProjectDetails = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { fetchedData: services, isLoading } = useFetchData(fetchServices);
  const { fetchedData: projects } = useFetchData(() => {
    return fetchProjectDetails();
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Projects' {...a11yProps(0)} />
          <Tab label='Activities' {...a11yProps(1)} />
          <Tab label='Consultants' {...a11yProps(2)} />
          <Tab label='Beneficiaries' {...a11yProps(3)} />
          <Tab label='Settings' {...a11yProps(4)} />
          <Tab label='Mentoring' {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProjectDetailsView project={projects[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminServicesTable services={services} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProjectConsultantsList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProjectBeneficiariesList />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AddProjectServiceForm />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <MentoringList />
      </TabPanel>
    </div>
  );
};

export default ProjectDetails;
