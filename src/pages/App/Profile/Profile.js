import React, { Fragment } from 'react';
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
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import authManager from 'services/authManager';
import ClientProfileContainer from './profileSections/ClientProfile/ClientProfileContainer';
import CorporateProfileContainer from './profileSections/CorporateProfile/CorporateProfileContainer';
import UserPrevProjectSection from './profileSections/UserPrevProjectSection';

const Profile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isClient = authManager.isClient();

  const PersonalInfo = () => {
    if (!!authManager.isOnlyClient()) {
      return <ClientProfileContainer />;
    } else if (!!authManager.isCorporate()) {
      return <CorporateProfileContainer />;
    } else {
      return <BasicInfoSection />;
    }
  };

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
        <Grid item xs={12} sm={8} lg={8}>
          <BreadcrumbsCustomSeparator pageName={t('profile')} />
          {PersonalInfo()}
          {!isClient && (
            <Fragment>
              <SummarySection />
              <PersonalInfoSection />
              <Fragment>
                <FieldsOfSpecializationSection />
                <WorkExperienceSection />
                <EducationAndCertificationSection />
                <UserPrevProjectSection />
              </Fragment>
            </Fragment>
          )}
        </Grid>
        {!isClient && (
          <Grid item xs={12} sm={3} lg={2}>
            <CVSection />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default Profile;
