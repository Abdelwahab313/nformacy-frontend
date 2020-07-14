import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../styles/formsStyles';
import React, { useRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BasicInfoForm from '../forms/BasicInfoForm';
import Transition from '../animations/Transition';
import t from '../../locales/en/freelancerProfile.json';

const BasicInfoSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(
    user.current.avatar || require('../../assets/emptyavatar.jpg'),
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Grid item id='basicInfo'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container xs={12}>
            <BasicInfoForm
              user={user}
              closeDialog={handleClose}
              setProfilePic={setProfilePic}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={11} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['basicInformation']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton aria-label='edit' id='editBasicInfo' onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <Grid item xs={12} sm={3} className={classes.profilePhotoContainer}>
            <img
              id='profilePicture'
              src={profilePic}
              width={150}
              alt='Profile Picture'
            />
          </Grid>
          <Grid xs={12} sm={9} className={classes.sectionRowContainerStyles}>
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
                  id='firstNameValue'
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
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default BasicInfoSection;
