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
            <PersonalInfoForm/>
          </FormContext>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={11} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['personalInfo']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton aria-label='edit' onClick={handleClickOpen}>
              <EditIcon color={'primary'}/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle}/>
        <Grid container spacing={5} className={classes.paperSectionContentStyles}>
          <Grid item xs={12} className={classes.sectionRowContainerStyles} style={{ paddingLeft: '45px' }}>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='gender'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.gender}
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  Country
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='country'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.country && countries?.find(country => country.value === user.current.country).label}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  Mobile Number
                </Typography></Grid>
              <Grid item xs={6}>
                <Typography
                  id='mobileNumber'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.mobileNumber}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  My current employment status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='currentEmploymentStatus'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.currentEmploymentStatus}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PersonalInfoSection;
