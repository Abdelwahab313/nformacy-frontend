import { dividerStyle, useStyles } from '../../../../styles/formsStyles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import Transition from '../../../../components/animations/Transition';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import React, { useRef } from 'react';
import Link from '@material-ui/core/Link';
import CVForm from '../../../../components/forms/CVForm';
import CustomTypography from 'components/typography/Typography';

const CVSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const [cvLink, setCVLink] = React.useState(user.current.cv);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Grid item id='cvSection'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'cvDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <CVForm
              user={user}
              setCVLink={setCVLink}
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
              {t('CV')}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton aria-label='edit' id='editCV' onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          justify='center'
          className={classes.paperSectionContentStyles}>
          <Grid item>
            {!!cvLink ? (
              <Link id='cvLink' target='_blank' href={cvLink}>
                {t('viewCV')}
              </Link>
            ) : (
              <CustomTypography variant={'body1'}>{t('noCv')}</CustomTypography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CVSection;
