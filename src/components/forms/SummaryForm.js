import { FormContext, useForm } from 'react-hook-form';
import { dividerStyle, saveButtonStyle, sectionContainerStyles, useStyles } from '../../styles/formsStyles';
import { updateProfile } from '../../apis/userAPI';
import Button from '@material-ui/core/Button';
import React from 'react';
import Container from '@material-ui/core/Container';
import ReactTooltip from 'react-tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { updateUser } from '../../pages/auth/context/authActions';
import { useAuth } from '../../pages/auth/context/auth';

const SummaryForm = ({ user, closeDialog }) => {
  const formMethods = useForm({
    defaultValues: { ...user.current },
  });
  const [_, dispatch] = useAuth();
  const classes = useStyles();

  const onSubmitSummary = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: user.current.id,
    };
    updateProfile(userToBeSubmitted, user.current.id)
      .then((response) => {
        updateUser(dispatch, response.data);
      })
      .catch((error) => {
      });
    user.current = { ...user.current, ...userData };
    closeDialog();
  };
  return (
    <FormContext user={user} {...formMethods}>
      <form
        id='summaryForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmitSummary)}>
        <Container style={sectionContainerStyles}>
          <ReactTooltip globalEventOff={'click'}/>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography gutterBottom className={classes.sectionHeaderStyles}>
                {t['summary']}
              </Typography>
            </Grid>
          </Grid>
          <Divider variant='middle' style={dividerStyle}/>
          <Container maxWidth={false} className={classes.formControl}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='summaryField'
                name='summary'
                inputRef={formMethods.register()}
                multiline
                rows={4}
                defaultValue={!user.current.summary && ''}
                autoComplete='summary'
              />
            </FormControl>
          </Container>
        </Container>
        <Button
          id='saveSummary'
          type='submit'
          variant='contained'
          style={saveButtonStyle()}
          color='primary'>
          Save
        </Button>
      </form>
    </FormContext>
  );
};
export default SummaryForm;
