import React from 'react';
import Grid from '@material-ui/core/Grid';
import BasicInfoSection from '../../components/profile/BasicInfoSection';
import PersonalInfoSection from '../../components/profile/PersonalInfoSection';
import FieldsOfSpecializationSection from '../../components/profile/FieldsOfSpecilaizationSection';

const ViewProfile = () => {
  return (
    <Grid container alignItems='center' direction='column'>
      <BasicInfoSection />
      <PersonalInfoSection />
      <FieldsOfSpecializationSection />
    </Grid>
  );
};

export default ViewProfile;
