import Grid from '@material-ui/core/Grid';
import React, { useRef, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import { FormContext, useForm } from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import { dividerStyle, useStyles } from '../../styles/formsStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import countryList from 'react-select-country-list';
import PersonalInfoForm from '../forms/PersonalInfoForm';

const PersonalInfoSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [countries] = useState(countryList().getData());
  const [open, setOpen] = React.useState(false);
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Grid item id='personalInfo'>
      <Dialog
        PaperProps={{ id: 'basicInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <FormContext {...formMethod} user={user}>
            <PersonalInfoForm />
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
              {t['personalInfo']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid container spacing={5}>
          <Grid item>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              Gender
            </Typography>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              Country
            </Typography>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              Mobile Number
            </Typography>
            <Typography
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              My current employment status
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              id='gender'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.gender}
            </Typography>
            <Typography
              id='country'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.country && countries?.find(country => country.value === user.current.country).label}
            </Typography>
            <Typography
              id='mobileNumber'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.mobileNumber}
            </Typography>
            <Typography
              id='currentEmploymentStatus'
              gutterBottom
              className={classes.fieldLabelStylesDesktop}>
              {user.current.currentEmploymentStatus}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PersonalInfoSection;
