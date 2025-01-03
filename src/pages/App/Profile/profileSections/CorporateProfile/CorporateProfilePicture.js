import React, { useRef, useState, Fragment } from 'react';
import { Grid, Typography, Dialog, DialogContent, Box, IconButton } from '@material-ui/core';
import { useStyles } from '../../../../../styles/formsStyles';
import CorporateProfilePicForm from '../../../../../components/forms/CorporateProfileForms/CorporateProfilePicForm';
import Transition from 'components/animations/Transition';
import EditIcon from '@material-ui/icons/Edit';

const CorporateProfilePicture = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [profilePic, setProfilePic] = useState(
    user.current.avatar || require('../../../../../assets/emptyavatar.jpg'),
  );

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
            <CorporateProfilePicForm
              user={user}
              closeDialog={handleClose}
              setProfilePic={setProfilePic}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item xs={12} sm={3} className={[classes.profilePhotoContainer, classes.profileAndNameContainer]}>
        <img
          id='profilePicture'
          src={profilePic}
          className={classes.largeProfilePic}
          alt='Profile'
        />
        <Box elevation={3} className={classes.personalInfoSections}>
          <Grid container>
            <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
              <Typography
                id='organizationNameValue'
                gutterBottom>
                {user.current.organizationName}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.paperSectionHeaderStyles}>
              <IconButton
                aria-label='edit'
                id='editBasicInfo'
                onClick={handleClickOpen}>
                <EditIcon color={'primary'} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default CorporateProfilePicture;