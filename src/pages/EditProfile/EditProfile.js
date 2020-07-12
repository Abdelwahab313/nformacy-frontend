import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles/formsStyles';
import { withNamespaces } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import BasicInfoForm from '../../components/forms/BasicInfoForm';
import PersonalInfoForm from '../../components/forms/PersonalInfoForm';
import FieldsOfSprecializtaionForm from '../../components/forms/FieldsOfSpecializationForm';
import ResumeForm from '../../components/forms/ResumeForm';

const EditProfile = ({ t }) => {
  const classes = useStyles();


  return (
    <Container component='main' maxWidth={false} dir='ltr'>
      <ReactTooltip globalEventOff={'click'}/>
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Edit Profile')}
        </Typography>
        <BasicInfoForm/>
        <PersonalInfoForm/>
        <FieldsOfSprecializtaionForm/>
        <ResumeForm/>
        <Container maxWidth={false} className={classes.formControl}/>
      </div>
    </Container>
  );
};
export default withNamespaces('editProfile')(EditProfile);
