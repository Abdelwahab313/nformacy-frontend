import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from 'styles/formsStyles';
import React, { useRef } from 'react';
import t from 'locales/en/freelancerProfile.json';
import FieldsOfSpecializationForm from 'components/forms/FieldsOfSpecializationForm';
import Transition from 'components/animations/Transition';
import useFieldsFetcher from 'hooks/useFieldsFetcher';
import clsx from 'clsx';
import { flatMap } from 'lodash';
import FieldsView from './FieldsView';
import useUserFieldsFetcher from '../../../../hooks/useUserFieldsFetcher';

const FieldsOfSpecializationSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const { fields, loading: fieldsLoading } = useFieldsFetcher();
  const {
    currentUserFields,
    updateUserFields,
    loading: userFieldsLoading,
  } = useUserFieldsFetcher();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item id='fieldsOfSpecialization'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <FieldsOfSpecializationForm
              user={user}
              fields={flatMap(currentUserFields)}
              updateFields={() => updateUserFields()}
              closeDialog={handleClose}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
          <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['fieldsOfSpecialization']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editFieldsOfSpecializations'
              onClick={handleClickOpen}>
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
                  {t['industryOfExperience']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.industriesOfExperience?.map((industry, key) => (
                  <Typography
                    id='industriesOfExperience'
                    key={key}
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {industry.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
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
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['assignmentLanguage']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.languageOfAssignments?.map((lng, key) => (
                  <Typography
                    id='languageOfAssignments'
                    key={key}
                    gutterBottom
                    className={classes.fieldValueStyles}>
                    {lng.label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container className={classes.sectionRowStyles}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  className={classes.fieldLabelStylesDesktop}>
                  {t['typesOfAssignments']}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {user.current?.typesOfAssignments?.map((lng, key) => (
                  <Typography
                    id='typesOfAssignments'
                    key={key}
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
