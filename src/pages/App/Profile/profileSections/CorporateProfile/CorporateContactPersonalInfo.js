import React, { Fragment, useState, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Dialog, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../../../../styles/formsStyles';
import Transition from 'components/animations/Transition';
import t from '../../../../../locales/en/freelancerProfile.json';
import CorporateContactPersonalInfoForm from 'components/forms/CorporateContactPersonalInfoForm';

const CorporateContactPersonalInfo = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
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
            <CorporateContactPersonalInfoForm
              user={user}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Box elevation={3} className={classes.personalInfoSections}>
        <Grid container>
          <Grid item xs={11} className={classes.personalInfoHeaderContainer}>
            <Typography gutterBottom className={classes.personalInfoHeader} >
              {t['contactPersonInfo']}
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
              {t['firstName']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='firstName'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.firstName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['lastName']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='lastName'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.lastName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sectionRowStyles}>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {t['title']}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id='title'
              gutterBottom
              className={classes.fieldValueStyles}>
              {user.current.jobTitle}
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

export default CorporateContactPersonalInfo;