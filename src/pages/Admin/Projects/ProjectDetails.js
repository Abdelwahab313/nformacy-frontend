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
import ProjectDetailsView from './ProjectDetailsView';
import ProjectSettingsForm from './ProjectSettingsForm';
import MentoringList from './MentoringList';
import ProjectServicesList from './ProjectServicesList';

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
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Projects' {...a11yProps(0)} />
          <Tab label='Activities' {...a11yProps(1)} />
          <Tab label='Consultants' {...a11yProps(2)} />
          <Tab label='Beneficiaries' {...a11yProps(3)} />
          <Tab label='Settings' {...a11yProps(4)} />
          <Tab label='Mentoring' {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <ProjectDetailsView />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ProjectServicesList />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ProjectConsultantsList />
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <ProjectBeneficiariesList />
      </TabPanel>
      <TabPanel value={selectedTab} index={4}>
        <ProjectSettingsForm />
      </TabPanel>
      <TabPanel value={selectedTab} index={5}>
        <MentoringList />
      </TabPanel>
    </div>
  );
};

export default ProjectDetails;
