import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FormContext, useForm } from 'react-hook-form';
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
            <FieldsOfSpecializationForm/>
          </FormContext>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={11} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['fieldsOfSpecialization']}
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
                <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                  {t['industryOfExperience']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.industriesOfExperience?.map((industry, key) => (
                  <Typography
                    id='industriesOfExperience'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {industry.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                  {t['experiencedIn']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.majorFieldsOfExperience?.map((major, key) => (
                  <Typography
                    id='majorFieldsOfExperience'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {major.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                  {t['specificallyIn']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.specificFieldsOfExperience?.map((specific, key) => (
                  <Typography
                    id='specificFieldsOfExperience'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {specific.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                  {t['assignmentLanguage']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.languageOfAssignments?.map((lng, key) => (
                  <Typography
                    id='languageOfAssignments'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {lng.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                  {t['typesOfAssignments']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.typesOfAssignments?.map((lng, key) => (
                  <Typography
                    id='typesOfAssignments'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {lng.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FieldsOfSpecializationSection;
