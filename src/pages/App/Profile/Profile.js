import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from '../../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import BasicInfoSection from './profileSections/BasicInfoSection';
import PersonalInfoSection from './profileSections/PersonalInfoSection';
import FieldsOfSpecializationSection from './profileSections/FieldsOfSpecilaizationSection';
import Grid from '@material-ui/core/Grid';
import EducationAndCertificationSection from './profileSections/EducationAndCertificationSection';
import WorkExperienceSection from './profileSections/WorkExperienceSection';
import SummarySection from './profileSections/SummarySection';
import CVSection from './profileSections/CVSection';

const Profile = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth={false} dir='ltr'>
      <ReactTooltip globalEventOff={'click'} />
      <CssBaseline />
      <Grid
        container
        justify={'center'}
        alignContent={'center'}
        className={classes.profileContainer}
        spacing={5}>
        <Grid item sm={1} />
        <Grid item xs={12} sm={8}>
          <BasicInfoSection />
          <SummarySection />
          <PersonalInfoSection />
          <FieldsOfSpecializationSection />
          <WorkExperienceSection />
          <EducationAndCertificationSection />
        </Grid>
        <Grid item xs={12} sm={2}>
          <CVSection />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profile;
