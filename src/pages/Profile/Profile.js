import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import BasicInfoSection from '../../components/profileSections/BasicInfoSection';
import PersonalInfoSection from '../../components/profileSections/PersonalInfoSection';
import FieldsOfSpecializationSection from '../../components/profileSections/FieldsOfSpecilaizationSection';
import Grid from '@material-ui/core/Grid';
import EducationAndCertificationSection from '../../components/profileSections/EducationAndCertificationSection';
import WorkExperienceSection from '../../components/profileSections/WorkExperienceSection';
import SummarySection from '../../components/profileSections/SummarySection';
import CVSection from '../../components/profileSections/CVSection';

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
