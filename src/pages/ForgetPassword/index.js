import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography, DialogContent, DialogContentText, DialogActions, Dialog } from '@material-ui/core';
import { useStyles } from 'styles/formsStyles';
import { useTranslation } from 'react-i18next';
import useForm from '../FormValidation/useForm';
import { validateForgetPasswordForm } from '../FormValidation/validateInfo';
import { forgetPassword } from 'apis/authAPI';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';

const ForgetPassword = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    validateForgetPasswordForm,
  );
  const classes = useStyles();
  const { t } = useTranslation();
  const [responseMessage, setResponseMessage] = useState('');
  const [showForgetPaswordPopup, setShowForgetPaswordPopup] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    history.push(RoutesPaths.App.Login);
  };

  const onSubmit = (e) => {
    setResponseMessage('');
    setOpen(true);
    handleSubmit(e, () => {
      forgetPassword(values.email)
        .then(() => {
          setShowForgetPaswordPopup(true);
        })
        .catch((reason) => {
          setResponseMessage(reason?.response?.data?.error);
        });
    });
  };

  return (
    <Grid
      container
      className={classes.logInPageContainer}
      alignContent={'center'}>
      <Grid container justify={'space-evenly'} alignContent={'center'}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={6}
          className={[classes.paper, classes.forgetPasswordForm]}>
          <Typography
            className={[classes.pageHeaderStyle, classes.forgetPasswordHeader]}>
            {t('forgetPassword')}
          </Typography>
          <form id='loginUserForm' className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label={t('Email')}
              name='email'
              autoComplete='email'
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={classes.error}>{errors.email}</span>
            )}
            {responseMessage && (
              <span className={classes.error}>{responseMessage}</span>
            )}
            <div className={classes.logInButtonContainer}>
              <Button
                id='login'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={onSubmit}
                className={classes.submit}>
                {t('submit')}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
      {!!showForgetPaswordPopup &&
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              E-mail sent with password reset instructions.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              ok
          </Button>
          </DialogActions>
        </Dialog>
      }
    </Grid>
  );
};

export default ForgetPassword;
