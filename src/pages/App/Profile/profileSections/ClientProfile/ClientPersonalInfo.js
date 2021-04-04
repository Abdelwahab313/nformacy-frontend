import React, { Fragment, useState, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
// import ClientProfilePersonalInfoForm from 'components/forms/ClientProfilePersonalInfoForm';
import ClientProfilePersonalInfoForm from 'components/forms/ClientProfileForms/ClientProfilePersonalInfoForm';
import t from '../../../../../locales/en/freelancerProfile.json';
import countryList from 'react-select-country-list';

const ClientPersonalInfo = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [countries] = useState(countryList().getData());
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <ClientProfilePersonalInfoForm
              user={user}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Box elevation={3} className={classes.personalInfoSections}>
        <Grid container>
          <Grid item xs={11} className={classes.personalInfoHeaderContainer}>
            <Typography className={classes.personalInfoHeader}>
              {t['personalInfo']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editBasicInfo'
              onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['countryOfResidence']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='countryOfResidence'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.country &&
                countries?.find(
                  (country) => country.value === user.current.country,
                ).label}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['email']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='email'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.email}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ClientPersonalInfo;