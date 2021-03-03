import Grid from '@material-ui/core/Grid';
import React, { useRef, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import { FormContext, useForm } from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import { dividerStyle, useStyles } from '../../../../styles/formsStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import t from '../../../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import countryList from 'react-select-country-list';
import PersonalInfoForm from '../../../../components/forms/PersonalInfoForm';
import Transition from '../../../../components/animations/Transition';
import { employmentStatus } from '../../../../constants/dropDownOptions';
import clsx from 'clsx';
import authManager from 'services/authManager';
import FieldsView from './FieldsView';
import useUserFieldsFetcher from 'hooks/useUserFieldsFetcher';
import useFieldsFetcher from 'hooks/useFieldsFetcher';

const PersonalInfoSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [countries] = useState(countryList().getData());
  const [open, setOpen] = React.useState(false);
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const isClient = authManager.isClient();
  const { fields, loading: fieldsLoading } = useFieldsFetcher();
  const {
    currentUserFields,
    loading: userFieldsLoading,
  } = useUserFieldsFetcher();

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
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'personalInfoDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <FormContext {...formMethod} user={user}>
            <Grid container>
              <PersonalInfoForm user={user} closeDialog={handleClose} />
            </Grid>
          </FormContext>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['personalInfo']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton aria-label='edit' id='editPersonalInfo' onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <Grid
            item
            xs={12}
            className={clsx([
              classes.sectionContainerPaddingLeft,
              classes.sectionRowContainerStyles,
            ])}>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['gender']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='genderValue'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.gender === 'M' ? 'Male' : 'Female'}
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['country']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  id='country'
                  gutterBottom
                  className={classes.fieldValueStyles}>
                  {user.current.country &&
                    countries?.find(
                      (country) => country.value === user.current.country,
                    ).label}
                </Typography>
              </Grid>
            </Grid>
            {!isClient && (
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['mobileNumber']}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    id='mobileNumber'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {user.current.mobileNumber}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {!!isClient && (
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['experiencedIn']}
                  </Typography>
                </Grid>
                <FieldsView
                  currentUserFields={currentUserFields}
                  fields={fields}
                  loading={userFieldsLoading || fieldsLoading}
                />
              </Grid>
            )}
            {!isClient && (
              <Grid container className={classes.sectionRowStyles}>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t['currentEmploymentStatus']}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    id='currentEmploymentStatus'
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {
                      employmentStatus.find(
                        (status) =>
                          status.value === user.current.currentEmploymentStatus,
                      )?.label
                    }
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PersonalInfoSection;
