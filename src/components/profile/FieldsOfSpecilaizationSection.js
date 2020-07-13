import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FormContext, useForm } from 'react-hook-form';
import BasicInfo from '../forms/BasicInfo';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../styles/formsStyles';
import React, { useRef, useState } from 'react';
import t from '../../locales/en/freelancerProfile.json';
import FieldsOfSpecializationForm from '../forms/FieldsOfSpecializationForm';

const FieldsOfSpecializationSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const classes = useStyles();
  const [avatar, setAvatar] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item id='fieldsOfSpecialization'>
      <Dialog
        PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <FormContext {...formMethod} user={user} setAvatar={setAvatar}>
            <FieldsOfSpecializationForm />
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
              {t['fieldsOfSpecialization']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid container jusify='flex-start'>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['industryOfExperience']}
          </Typography>
          <Grid container>
            {user.current?.industriesOfExperience?.map((industry, key) => (
              <Grid item key={key} xs={5}>
                {industry.label}
              </Grid>
            ))}
          </Grid>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['experiencedIn']}
          </Typography>
          <Grid container>
            {user.current?.majorFieldsOfExperience?.map((major, key) => (
              <Grid item key={key} xs={5}>
                {major.label}
              </Grid>
            ))}
          </Grid>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['specificallyIn']}
          </Typography>
          <Grid container>
            {user.current?.specificFieldsOfExperience?.map((specific, key) => (
              <Grid item key={key} xs={5}>
                {specific.label}
              </Grid>
            ))}
          </Grid>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['assignmentLanguage']}
          </Typography>
          <Grid container>
            {user.current?.languageOfAssignments?.map((lng, key) => (
              <Grid item key={key} xs={5}>
                {lng.label}
              </Grid>
            ))}
          </Grid>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['typesOfAssignments']}
          </Typography>
          <Grid container>
            {user.current?.typesOfAssignments?.map((lng, key) => (
              <Grid item key={key} xs={5}>
                {lng.label}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FieldsOfSpecializationSection;
