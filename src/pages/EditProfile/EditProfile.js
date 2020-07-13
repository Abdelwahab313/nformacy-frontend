import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import ResumeForm from '../../components/forms/ResumeForm';
import BasicInfoSection from '../../components/profile/BasicInfoSection';
import PersonalInfoSection from '../../components/profile/PersonalInfoSection';
import FieldsOfSpecializationSection from '../../components/profile/FieldsOfSpecilaizationSection';
import Grid from '@material-ui/core/Grid';

const EditProfile = ({ t }) => {
  const classes = useStyles();


  return (
    <Container component='main' maxWidth={false} dir='ltr'>
      <ReactTooltip globalEventOff={'click'}/>
      <CssBaseline/>
      <Grid container justify={'center'} alignContent={'center'}>
        <Grid item xs={12} sm={8}>
          <Typography className={classes.pageHeaderStyle} style={{ textAlign: 'center' }}>
            {t('Edit Profile')}
          </Typography>
          <BasicInfoSection/>
          <PersonalInfoSection/>
          <FieldsOfSpecializationSection/>
          <ResumeForm/>
        </Grid>
        <Container maxWidth={false} className={classes.formControl}/>
      </Grid>
    </Container>
  );
};
export default withNamespaces('editProfile')(EditProfile);
