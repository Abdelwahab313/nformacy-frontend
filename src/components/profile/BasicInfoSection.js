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
import { FormContext, useForm } from 'react-hook-form';
import BasicInfoForm from '../forms/BasicInfoForm';

const BasicInfoSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const [avatar, setAvatar] = useState([]);

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
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <FormContext {...formMethod} user={user} setAvatar={setAvatar}>
            <BasicInfoForm />
          </FormContext>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify='flex-end'>
          <IconButton aria-label='edit' onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              Basic Information
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <img
          id='profilePicture'
          src={user.current.avatar || require('../../assets/emptyavatar.jpg')}
          width={150}
          alt='Profile Picture'
        />
        <Grid container spacing={5}>
          <Grid item>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              First Name
            </Typography>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              Last Name
            </Typography>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              Email
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              id='firstName'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.firstName}
            </Typography>
            <Typography
              id='lastName'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.lastName}
            </Typography>
            <Typography
              id='email'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default BasicInfoSection;
