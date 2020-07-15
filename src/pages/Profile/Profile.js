import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from '../../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import BasicInfoSection from '../../components/profileSections/BasicInfoSection';
import PersonalInfoSection from '../../components/profileSections/PersonalInfoSection';
import FieldsOfSpecializationSection from '../../components/profileSections/FieldsOfSpecilaizationSection';
import Grid from '@material-ui/core/Grid';
import EducationAndCertificationSection from '../../components/profileSections/EducationAndCertificationSection';
import WorkExperienceSection from '../../components/profileSections/WorkExperienceSection';
import SummarySection from '../../components/profileSections/SummarySection';

const Profile = ({ t }) => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth={false} dir='ltr'>
      <ReactTooltip globalEventOff={'click'} />
      <CssBaseline />
      <Grid container justify={'center'} alignContent={'center'}  className={classes.profileContainer}>
        <Grid item xs={12} sm={8}>
          <BasicInfoSection />
          <SummarySection />
          <PersonalInfoSection />
          <FieldsOfSpecializationSection />
          <WorkExperienceSection />
          <EducationAndCertificationSection />
        </Grid>
      </Grid>
    </Container>
  );
};
export default withNamespaces('profile')(Profile);
