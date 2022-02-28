import React from 'react';
import classNames from 'clsx';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { getUserName } from 'core/user';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import authManager from 'services/authManager';
import DefaultSummary from './DefaultSummary';
import Transition from 'components/animations/Transition';

const CandidateItem = ({
  candidate,
  isFocused,
  setFocusedCandidate,
  onCandidateClick,
  bgcolor,
  buttonText,
  clientType = '',
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const isAdmin = authManager.isAdmin();
  const defaultImage = require('../../../../../assets/emptyavatar.jpg');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.candidateContainerBorder}>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <DefaultSummary candidate={candidate} />
          </Grid>
        </DialogContent>
      
        <DialogActions   className={classNames(classes.DialogActionsButton, {
      [classes.DialogActionsButtonAr]: isArlang,
    })}>
          <Button onClick={handleClose} color='primary' autoFocus>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          justify='center'
          onMouseEnter={() => setFocusedCandidate(candidate.id)}
          onMouseLeave={() => setFocusedCandidate('')}>
          <Box
            style={{ backgroundColor: bgcolor }}
            textAlign='center'
            width={1}>
            <Grid item xs={12} md={12}>
              <img
                src={!!candidate.avatar ? candidate.avatar : defaultImage}
                className={classes.candidateImg}
              />
            </Grid>
          </Box>
          <Box p={2} textAlign='center'>
            <Grid item xs={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {getUserName(candidate)}
              </CustomTypography>
              <Button
                onClick={handleClickOpen}
                className={classes.defaultSummaryBtn}>
                {t('summary')}
              </Button>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}></CustomTypography>
            </Grid>
            <Grid container justify='center' xs={12}>
              {isFocused && !isAdmin && !!buttonText && (
                <SubmitButton
                  id={'proceedBtn'}
                  className={classes.desktopVisible}
                  onClick={() => onCandidateClick()}
                  buttonText={
                    <CustomTypography variant='body1'>
                      {buttonText}
                    </CustomTypography>
                  }
                />
              )}
              {!isAdmin && !!buttonText && (
                <SubmitButton
                  id={'proceedBtn'}
                  className={classes.mobileVisible}
                  onClick={() => onCandidateClick()}
                  buttonText={
                    <CustomTypography variant='body1'>
                      {buttonText}
                    </CustomTypography>
                  }
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {!!isAdmin && <CustomTypography>{clientType}</CustomTypography>}
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
};

export default CandidateItem;
